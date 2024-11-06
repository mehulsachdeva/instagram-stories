import styles from "./Thumbnails.module.css"
import Story from "./Story"
import { UserStoriesType } from "types/story"

interface ThumbnailsProps {
	data: Array<UserStoriesType>
	onClick: (data: UserStoriesType) => void
}

const Thumbnails = (props: ThumbnailsProps) => {
	const { data, onClick } = props

	if (!data?.length) return null
	return (
		<div className={`${styles.container} hsb`}>
			{data.map((user) => {
				return <Story key={user.user_id} data={user} onClick={onClick} />
			})}
		</div>
	)
}

export default Thumbnails
