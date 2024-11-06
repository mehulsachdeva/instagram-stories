import { useState, useCallback, Suspense, lazy } from "react"
import { USERS as users } from "constants/stories"
import Header from "components/common/core/Header"
import Thumbnails from "components/common/core/Thumbnails"
import { UserStoriesType, NavigationType } from "types/story"

const StoryPreview = lazy(() => import("components/common/core/StoryPreview"))

const Dashboard = () => {
	const [preview, setPreview] = useState<UserStoriesType | null>(null)
	const activeUserIdx = users.findIndex((user) => user.user_id === preview?.user_id)

	const handleUserSwitch = useCallback(
		(type: NavigationType) => {
			if (type === "previous") {
				if (activeUserIdx > 0) {
					setPreview(users[activeUserIdx - 1])
				}
			} else {
				if (activeUserIdx < users.length) {
					setPreview(users[activeUserIdx + 1])
				} else {
					setPreview(null)
				}
			}
		},
		[activeUserIdx],
	)

	return (
		<>
			<Header />
			<Thumbnails data={users} onClick={setPreview} />
			{preview ? (
				<Suspense>
					<StoryPreview
						data={preview}
						onSwitch={handleUserSwitch}
						onClose={() => setPreview(null)}
					/>
				</Suspense>
			) : null}
		</>
	)
}

export default Dashboard
