import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import "@testing-library/jest-dom"
import StoryPreview from "."
import { USERS } from "constants/stories"

const mockData = USERS[0]

describe("StoryPreview", () => {
	const mockOnClose = jest.fn()
	const mockOnSwitch = jest.fn()

	test("renders the component correctly", () => {
		render(<StoryPreview data={mockData} onClose={mockOnClose} onSwitch={mockOnSwitch} />)

		expect(screen.getByText(mockData.username)).toBeInTheDocument()

		const profileImage = screen.getByAltText("profile")
		expect(profileImage).toHaveAttribute("src", mockData.picture)

		const storyImage = screen.getByAltText("story")
		expect(storyImage).toHaveAttribute("src", mockData.stories[0].link)

		expect(screen.getByText(mockData.stories[0].timestamp)).toBeInTheDocument()
	})

	test("navigates to the next story after the timeout", async () => {
		render(
			<StoryPreview data={mockData} timeout={500} onClose={mockOnClose} onSwitch={mockOnSwitch} />,
		)

		const firstStoryImage = screen.getByAltText("story")
		expect(firstStoryImage).toHaveAttribute("src", mockData.stories[0].link)
		fireEvent.load(firstStoryImage)

		await waitFor(() => {
			const secondStoryImage = screen.getByAltText("story")
			expect(secondStoryImage).toHaveAttribute("src", mockData.stories[1].link)
		})
	})

	test('navigates to the previous story when clicking the "previous" area', async () => {
		render(<StoryPreview data={mockData} onClose={mockOnClose} onSwitch={mockOnSwitch} />)

		const story = screen.getByAltText("story")
		expect(story).toHaveAttribute("src", mockData.stories[0].link)
		fireEvent.load(story)

		await waitFor(async () => {
			const previousSection = screen.getByTestId("previous")
			fireEvent.click(previousSection)
			expect(mockOnSwitch).toHaveBeenCalledWith("previous")
		})
	})

	test("closes the story when clicking the close button", () => {
		render(<StoryPreview data={mockData} onClose={mockOnClose} onSwitch={mockOnSwitch} />)

		const closeButton = screen.getByTestId("close")
		fireEvent.click(closeButton)

		expect(mockOnClose).toHaveBeenCalled()
	})
})
