import { render, screen, fireEvent } from "@testing-library/react"
import Story from "."
import { USERS } from "constants/stories"

const mockData = USERS[0]

describe("Story", () => {
	const mockOnClick = jest.fn()

	test("should render component and handle click", () => {
		render(<Story data={mockData} onClick={mockOnClick} />)
		expect(screen.getByAltText("story")).toHaveAttribute("src", mockData.picture)
		expect(screen.getByText(mockData.username)).toBeInTheDocument()
		fireEvent.click(screen.getByTestId("container"))
		expect(mockOnClick).toHaveBeenCalledWith(mockData)
	})
})
