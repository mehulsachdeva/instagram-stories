import { memo } from "react"
import styles from "./Header.module.css"

const Header = () => {
	return (
		<div className={styles.container}>
			<img src="/logos/instagram.webp" width={105} height={28} alt="instagram" />
		</div>
	)
}

export default memo(Header)
