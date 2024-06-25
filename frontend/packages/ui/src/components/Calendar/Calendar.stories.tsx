import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"
import { Calendar } from "./Calendar"

const meta = {
  title: "Zicdding-UI/Calendar",
  component: Calendar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    mode: { control: { type: "select", options: ["single", "multiple", "range"] } },
    selected: { control: "object" },
    onSelect: { action: "changed" },
  },
  args: {},
} satisfies Meta<typeof Calendar>

export default meta

const firstDate = new Date()
const secondDate = new Date(new Date().setDate(firstDate.getDate() + 1))
const thirdDate = new Date(new Date().setDate(firstDate.getDate() + 2))
const forthDate = new Date(new Date().setDate(firstDate.getDate() + 3))

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    mode: "single",
    selected: firstDate,
    onSelect: fn(),
  },
}

export const Multiple: Story = {
  args: {
    mode: "multiple",
    selected: [firstDate, secondDate, thirdDate],
    onSelect: fn(),
  },
}

export const Range: Story = {
  args: {
    mode: "range",
    selected: { from: firstDate, to: forthDate },
    onSelect: fn(),
  },
}
