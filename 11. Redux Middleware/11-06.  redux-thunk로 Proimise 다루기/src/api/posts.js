const sleep = (n) => new Promise((resolve) => setTimeout(resolve, n));

const posts = [
	{
		id: 1,
		title: "리덕스 미들웨어를 배워봅시다",
		body: "리덕스 미들웨어는 무엇일까요?"
	},
	{
		id: 2,
		title: "redux-logger를 배워봅시다",
		body: "리덕스 미들웨어를 직접 만들어보면 이해하기가 쉽죠"
	},
	{
		id: 3,
		title: "redux-thunk를 배워봅시다",
		body: "redux-thunk를 사용해서 비동기 작업을 처리합시다"
	}
];

export const getPosts = async () => {
	await sleep(500);
	return posts;
}; // 500 ms 후에 posts를 return

export const getPostById = async (id) => {
	await sleep(500);
	return posts.find((post) => post.id === id);
};
