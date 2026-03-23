import type { LocaleMessages } from "./index";

const messages: LocaleMessages = {
	sync: {
		active: "동기화 중",
		inactive: "동기화 중지됨",
		notConfigured: "동기화되지 않음",
		success: "동기화가 완료되었습니다",
		error: "동기화에 실패했습니다",
	},
	ui: {
		minimize: "최소화",
		title: "Galbi SDK",
	},
	upload: {
		title: "업로드 설정",
		autoSync: "자동 동기화",
		exportGltf: "GLTF로 내보내기",
		gltf: "GLTF",
		stl: "STL",
		urlPlaceholder: "URL 생성하기",
		copyUrl: "URL 복사",
		expiresAt: "만료일:",
		regenerateUrl: "URL 재생성",
		generateUrl: "URL 생성",
		sync: "지금 동기화",
		autoSyncDescription: "자동 동기화가 활성화되었습니다. 장면 변경사항이 자동으로 업로드됩니다.",
		manualSyncDescription:
			'수동 업로드 모드입니다. "URL 생성"을 클릭하여 업로드 URL을 받은 다음 "지금 동기화" 버튼을 사용하여 수동으로 동기화하세요.',
	},
	export: {
		success: "모델을 성공적으로 내보냈습니다",
		error: "내보내기에 실패했습니다",
	},
	copy: {
		success: "URL이 복사되었습니다",
		error: "URL 복사에 실패했습니다",
	},
	toggle: {
		errorNotGenerated: "먼저 URL을 생성해주세요",
		enabled: "자동 동기화가 활성화되었습니다",
		disabled: "자동 동기화가 비활성화되었습니다",
		error: "자동 동기화 설정에 실패했습니다",
	},
	loading: "로딩 중...",
	autoSync: {
		success: "자동 동기화가 완료되었습니다",
		error: "자동 동기화에 실패했습니다",
	},
	generateUrl: {
		success: "URL이 생성되었습니다",
		error: "URL 생성에 실패했습니다",
	},
};

export default messages;
