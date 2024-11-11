import { render, screen, waitFor } from "@testing-library/react"
import Thumbnails from "."
import { USERS as mockData } from "constants/stories"

describe("Thumbnails", () => {
	const mockOnClick = jest.fn()

	test("should render component", () => {
		render(<Thumbnails data={mockData} onClick={mockOnClick} />)
		mockData.forEach(async (user) => {
			await waitFor(() => {
				expect(screen.getByText(user.username)).toBeInTheDocument()
			})
		})
	})
})
