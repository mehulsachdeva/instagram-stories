export type NavigationType = "next" | "previous"

export type StoryType = {
	story_id: number
	link: string
	timestamp: string
}

export type UserStoriesType = {
	user_id: number
	username: string
	picture?: string
	stories: Array<StoryType>
}
