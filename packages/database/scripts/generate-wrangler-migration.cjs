const fs = require("node:fs");
const path = require("node:path");

const rootDir = path.resolve(__dirname, "..");
const schemaPath = path.join(rootDir, "prisma", "schema.prisma");
const migrationsDir = path.join(rootDir, "migrations");
const migrationPath = path.join(migrationsDir, "0001_init.sql");

const scalarTypeMap = {
	String: "TEXT",
	Int: "INTEGER",
	Boolean: "BOOLEAN",
	DateTime: "DATETIME",
	Float: "REAL",
};

function parseDefault(attribute) {
	if (attribute.includes("@default(now())")) {
		return "CURRENT_TIMESTAMP";
	}

	const defaultMatch = attribute.match(/@default\((.+?)\)/);
	if (!defaultMatch) {
		return null;
	}

	const value = defaultMatch[1].trim();
	if (value === "true" || value === "false") {
		return value;
	}
	if (/^-?\d+$/.test(value)) {
		return value;
	}

	return null;
}

function parseField(line) {
	const trimmed = line.trim();
	if (!trimmed || trimmed.startsWith("//") || trimmed.startsWith("@@")) {
		return null;
	}

	const parts = trimmed.split(/\s+/);
	if (parts.length < 2) {
		return null;
	}

	const [name, rawType, ...attributes] = parts;
	const type = rawType.replace(/\?$/, "");
	const optional = rawType.endsWith("?");
	const sqlType = scalarTypeMap[type];

	if (!sqlType) {
		throw new Error(`Unsupported Prisma scalar type: ${type}`);
	}

	const attributeText = attributes.join(" ");

	return {
		name,
		sqlType,
		optional,
		isId: attributeText.includes("@id"),
		isUnique: attributeText.includes("@unique"),
		isUpdatedAt: attributeText.includes("@updatedAt"),
		defaultValue: parseDefault(attributeText),
	};
}

function parseModels(schemaText) {
	const models = [];
	const modelRegex = /model\s+(\w+)\s+\{([\s\S]*?)\}/g;

	for (const match of schemaText.matchAll(modelRegex)) {
		const [, modelName, body] = match;
		const lines = body
			.split(/\r?\n/)
			.map(line => line.trim())
			.filter(Boolean);

		const fields = [];
		let tableName = modelName;

		for (const line of lines) {
			if (line.startsWith("@@map(")) {
				const mapMatch = line.match(/@@map\("(.+?)"\)/);
				if (mapMatch) {
					tableName = mapMatch[1];
				}
				continue;
			}

			const field = parseField(line);
			if (field) {
				fields.push(field);
			}
		}

		models.push({ modelName, tableName, fields });
	}

	return models;
}

function quoteIdentifier(identifier) {
	return `"${identifier}"`;
}

function renderCreateTable(model) {
	const columnSql = model.fields.map(field => {
		const parts = [quoteIdentifier(field.name), field.sqlType];

		if (!field.optional) {
			parts.push("NOT NULL");
		}

		if (field.isId) {
			parts.push("PRIMARY KEY");
		}

		if (field.defaultValue) {
			parts.push("DEFAULT", field.defaultValue);
		}

		return `    ${parts.join(" ")}`;
	});

	return [
		"-- CreateTable",
		`CREATE TABLE ${quoteIdentifier(model.tableName)} (`,
		columnSql.join(",\n"),
		");",
	].join("\n");
}

function renderUniqueIndexes(model) {
	const statements = [];

	for (const field of model.fields) {
		if (field.isUnique && !field.isId) {
			statements.push(
				[
					"-- CreateIndex",
					`CREATE UNIQUE INDEX ${quoteIdentifier(`${model.tableName}_${field.name}_key`)} ON ${quoteIdentifier(model.tableName)}(${quoteIdentifier(field.name)});`,
				].join("\n"),
			);
		}
	}

	return statements;
}

function generateSql(schemaText) {
	const models = parseModels(schemaText);
	const sections = [];

	for (const model of models) {
		sections.push(renderCreateTable(model));
		sections.push(...renderUniqueIndexes(model));
	}

	return `${sections.join("\n\n")}\n`;
}

const schemaText = fs.readFileSync(schemaPath, "utf8");
const sql = generateSql(schemaText);

fs.mkdirSync(migrationsDir, { recursive: true });
for (const entry of fs.readdirSync(migrationsDir)) {
	if (entry.endsWith(".sql")) {
		fs.rmSync(path.join(migrationsDir, entry), { force: true });
	}
}

fs.writeFileSync(migrationPath, sql, "utf8");
console.log(`[db:migrate:from-schema] wrote ${path.relative(rootDir, migrationPath)}`);
