import { trpcServer } from "@hono/trpc-server";
import type Database from "@repo/database";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { AnonymousService } from "./services/anonymous.service";
import { appRouter } from "./trpc";

type Env = {
	Bindings: {
		DATABASE: Service<Database>;
		R2: R2Bucket;
	};
};

export type HonoContext = {
	env: Env["Bindings"];
};

const app = new Hono<Env>();

app.use("*", cors({ origin: "*" }));

app.use(
	"/share/trpc/*",
	trpcServer({
		router: appRouter,
		endpoint: "/share/trpc",
	}),
);

app.get("/share/:publicUrl", async c => {
	const publicUrl = c.req.param("publicUrl");
	const anonymousService = new AnonymousService(c);

	const model = await anonymousService.getModelByPublicUrl(publicUrl);
	const fileUrl = model?.fileUrl;
	if (!fileUrl) {
		return c.json({ error: "Model not found" }, 404);
	}

	const isProduction = fileUrl.includes("http");
	if (isProduction) {
		return c.redirect(fileUrl);
	}
	// http://localhost:5173/order/0619
	const fileName = fileUrl.split("/").pop();
	if (!fileName) {
		return c.json({ error: "Invalid file URL" }, 400);
	}
	const file = await c.env.R2.get(fileName);
	if (!file) {
		return c.json({ error: "File not found" }, 404);
	}
	// ファイルをダウンロードする(orderId.glbとして)
	return c.body(file.body, 200, {
		"Content-Type": "application/octet-stream",
		"Content-Disposition": `attachment; filename="${fileName}"`,
	});
});

export default app;

export type AppRouter = typeof appRouter;
