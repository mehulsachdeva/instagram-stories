import { render, screen, fireEvent } from "@testing-library/react"
import Story from "."
import { USERS } from "constants/stories"

const mockData = USERS[0]

describe("Story", () => {
	const mockOnClick = jest.fn()

	test("should render component and handle click", () => {
		render(<Story data={mockData} onClick={mockOnClick} />)

		const img = screen.getByAltText("story")
		expect(img).toHaveAttribute("src", mockData.picture)

		const username = screen.getByText(mockData.username)
		expect(username).toBeInTheDocument()

		const container = screen.getByTestId("container")
		fireEvent.click(container)

		expect(mockOnClick).toHaveBeenCalledWith(mockData)
	})
})
