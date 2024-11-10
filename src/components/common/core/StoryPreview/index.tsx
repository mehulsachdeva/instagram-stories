import { useState, useEffect, useRef } from "react"
import styles from "./StoryPreview.module.css"
import { prefetchImage } from "utils/image"
import { Spinner } from "components/common/shared/Spinner"
import { Cross } from "components/common/icons/Cross"
import { KebabMenu } from "components/common/icons/KebabMenu"
import { UserStoriesType, NavigationType } from "types/story"

interface StoryPreviewProps {
	data: UserStoriesType
	timeout?: number
	onClose: () => void
	onSwitch: (type: NavigationType) => void
}

const StoryPreview = (props: StoryPreviewProps) => {
	const { data, timeout = 5000, onClose, onSwitch } = props
	const [activeIdx, setActiveIdx] = useState(0)
	const [loading, setLoading] = useState(false)
	const timeoutRef = useRef<NodeJS.Timeout | null>(null)

	const { username, picture, stories } = data || {}
	const activeStory = stories[activeIdx] || {}

	useEffect(() => {
		handleStorySwitch(0)
		return () => handleClearTimeout()
	}, [data])

	useEffect(() => {
		if (stories?.length && !loading) {
			prefetchImage(stories[activeIdx + 1]?.link)
			timeoutRef.current = setTimeout(() => {
				if (activeIdx < stories.length - 1) {
					handleStorySwitch(activeIdx + 1)
				} else {
					handleUserSwitch("next")
				}
			}, timeout)
		} else {
			handleClearTimeout()
		}
	}, [loading, stories, activeIdx, timeout])

	const handleScreenSectionClick = (type: NavigationType) => {
		if (loading) return
		handleClearTimeout()
		if (type === "previous") {
			if (activeIdx > 0) {
				handleStorySwitch(activeIdx - 1)
			} else {
				handleUserSwitch("previous")
			}
		} else {
			if (activeIdx < stories.length - 1) {
				handleStorySwitch(activeIdx + 1)
			} else {
				handleUserSwitch("next")
			}
		}
	}

	const handleClose = () => {
		onClose()
		handleClearTimeout()
	}

	const handleStorySwitch = (idx: number) => {
		setLoading(true)
		setActiveIdx(idx)
	}

	const handleUserSwitch = (type: NavigationType) => {
		onSwitch(type)
		if (activeIdx > 0) {
			handleStorySwitch(activeIdx)
		}
	}

	const handleClearTimeout = () => {
		if (!timeoutRef.current) return
		clearTimeout(timeoutRef.current)
	}

	if (!stories?.length) return null
	return (
		<div className={styles.container}>
			{!loading ? (
				<style>{`
          .fill-${activeIdx} {
            animation: fillProgress ${timeout}ms linear forwards;
          }
          @keyframes fillProgress {
            from {
              width: 0%;
            }
            to {
              width: 100%;
            }
          }
        `}</style>
			) : null}
			<div className={styles.progress}>
				{stories.map((story, idx) => {
					const filled = activeIdx > idx

					return (
						<div key={story.story_id} className={styles.segment}>
							<div className={`${styles.fill} ${filled ? styles.filled : ""} fill-${idx}`}></div>
						</div>
					)
				})}
			</div>
			<div className={styles.panel}>
				<div className={styles.details}>
					<div className={styles.userPicture}>
						{picture ? (
							<img
								src={picture}
								className={styles.image}
								width="100%"
								height="100%"
								loading="lazy"
								alt="profile"
							/>
						) : null}
					</div>
					<div className={styles.username}>{username}</div>
					<div className={styles.timestamp}>{activeStory.timestamp}</div>
				</div>
				<div className={styles.actions}>
					<div className={styles.button}>
						<KebabMenu width={16} height={16} />
					</div>
					<div data-testid="close" className={styles.button} onClick={handleClose}>
						<Cross width={14} height={14} />
					</div>
				</div>
			</div>
			{loading ? (
				<div data-testid="loader" className={styles.loader}>
					<Spinner />
				</div>
			) : (
				<div className={styles.clickable}>
					<div data-testid="previous" onClick={() => handleScreenSectionClick("previous")} />
					<div data-testid="next" onClick={() => handleScreenSectionClick("next")} />
				</div>
			)}
			<img
				src={activeStory.link}
				className={`${styles.image} ${loading ? styles.imageLoading : ""}`}
				onLoad={() => setLoading(false)}
				width="100%"
				height="100%"
				loading="lazy"
				alt="story"
			/>
		</div>
	)
}

export default StoryPreview
