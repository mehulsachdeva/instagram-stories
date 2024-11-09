import styles from "./Story.module.css"
import { UserStoriesType } from "types/story"

interface StoryProps {
	data: UserStoriesType
	onClick: (data: UserStoriesType) => void
}

const Story = (props: StoryProps) => {
	const { data, onClick } = props
	const { username, picture, stories } = data || {}

	if (!stories?.length) return null
	return (
		<div data-testid="container" className={styles.container} onClick={() => onClick(data)}>
			<div className={styles.thumbnail}>
				<div className={styles.story}>
					<img
						src={picture || stories[0].link}
						className={styles.image}
						width="100%"
						height="100%"
						loading="lazy"
						alt="story"
					/>
				</div>
			</div>
			<div className={styles.username}>{username}</div>
		</div>
	)
}

export default Story
