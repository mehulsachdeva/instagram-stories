import "@testing-library/jest-dom"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import StoryPreview from "."
import { USERS } from "constants/stories"

const mockData = USERS[0]

describe("StoryPreview", () => {
	const mockOnClose = jest.fn()
	const mockOnSwitch = jest.fn()

	test("renders the component correctly", () => {
		render(<StoryPreview data={mockData} onClose={mockOnClose} onSwitch={mockOnSwitch} />)
		expect(screen.getByText(mockData.username)).toBeInTheDocument()
		expect(screen.getByAltText("profile")).toHaveAttribute("src", mockData.picture)
		expect(screen.getByAltText("story")).toHaveAttribute("src", mockData.stories[0].link)
		expect(screen.getByText(mockData.stories[0].timestamp)).toBeInTheDocument()
	})

	test("shows loading spinner while the story is loading", () => {
		render(<StoryPreview data={mockData} onClose={mockOnClose} onSwitch={mockOnSwitch} />)

		expect(screen.getByTestId("loader")).toBeInTheDocument()
		fireEvent.load(screen.getByAltText("story"))

		expect(screen.queryByTestId("loader")).not.toBeInTheDocument()
	})

	test("auto switches to the next story after the timeout", async () => {
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

	test('navigates correctly on clicking the "next" / "previous" area', async () => {
		render(<StoryPreview data={mockData} onClose={mockOnClose} onSwitch={mockOnSwitch} />)

		const story = screen.getByAltText("story")
		expect(story).toHaveAttribute("src", mockData.stories[0].link)
		fireEvent.load(story)

		const nextSection = screen.getByTestId("next")
		expect(nextSection).toBeInTheDocument()
		fireEvent.click(nextSection)

		const nextStory = screen.getByAltText("story")
		expect(nextStory).toHaveAttribute("src", mockData.stories[1].link)
		fireEvent.load(nextStory)

		const previousSection = screen.getByTestId("previous")
		expect(previousSection).toBeInTheDocument()
		fireEvent.click(previousSection)

		const previousStory = screen.getByAltText("story")
		expect(previousStory).toHaveAttribute("src", mockData.stories[0].link)
		fireEvent.load(previousStory)
	})

	test("closes the story when clicking the close button", () => {
		render(<StoryPreview data={mockData} onClose={mockOnClose} onSwitch={mockOnSwitch} />)

		const closeButton = screen.getByTestId("close")
		fireEvent.click(closeButton)

		expect(mockOnClose).toHaveBeenCalled()
	})
})
