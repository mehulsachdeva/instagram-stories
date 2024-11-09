import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import Header from "."

describe("Header", () => {
	test("render", () => {
		render(<Header />)
		const logo = screen.getByAltText("instagram")
		expect(logo).toBeInTheDocument()
		expect(logo).toHaveAttribute("src", "/logos/instagram.webp")
		expect(logo).toHaveAttribute("width", "105")
		expect(logo).toHaveAttribute("height", "28")
	})
})
