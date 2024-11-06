import { memo, CSSProperties } from "react"
import styles from "./Spinner.module.css"

type SpinnerProps = {
	size?: string | number
	stroke?: string | number
	color?: string
	className?: string
}

const SpinnerComponent = (props: SpinnerProps) => {
	const { size = "18px", stroke = "1.5px", color = "#ffffff", className = "" } = props

	return (
		<div
			style={
				{
					"--size": typeof size === "string" ? size : `${size}px`,
					"--stroke-width": typeof stroke === "string" ? stroke : `${stroke}px`,
					"--color": color,
				} as CSSProperties
			}
			className={`${styles.container} ${className}`}
		>
			<div />
			<div />
			<div />
			<div />
		</div>
	)
}

const Spinner = memo(SpinnerComponent)
export { Spinner }
