import type { Meta, StoryObj } from '@storybook/angular';
import { STORY_PEOPLE } from '../../stories/story-data';
import { AthAvatarStackComponent, type StackedUser } from './avatar-stack.component';

const USERS: StackedUser[] = STORY_PEOPLE.map((p) => ({ id: p.id ?? '', name: p.name ?? '' }));

const meta: Meta<AthAvatarStackComponent> = {
  title: 'Display/Avatar stack',
  component: AthAvatarStackComponent,
  argTypes: { size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] } },
  args: { max: 4, size: 'sm' },
  render: (args) => ({
    props: { ...args, users: USERS },
    template: `<ath-avatar-stack [users]="users" [max]="max" [size]="size" />`,
  }),
};

export default meta;
type Story = StoryObj<AthAvatarStackComponent>;

export const Overflow: Story = {};
export const FitsAll: Story = { args: { max: 10 } };
export const Empty: Story = {
  render: () => ({ template: `<ath-avatar-stack [users]="[]" />` }),
};
export const RightToLeft: Story = { globals: { dir: 'rtl' }, args: { size: 'md' } };

/** Small avatars with like initials ("MM", "MW"): each initial stays readable, and "+3" reads clearly. */
export const SmallSimilarInitials: Story = {
  render: () => ({
    props: {
      users: [
        { id: 'u-mm', name: 'Mira Mock' },
        { id: 'u-mw', name: 'Mona Weber' },
        { id: 'u-ew', name: 'Elias Weber' },
        { id: 'u-sm', name: 'Sara Moll' },
        { id: 'u-jk', name: 'Jonas Keller' },
        { id: 'u-lb', name: 'Lea Brandt' },
        { id: 'u-tn', name: 'Tim Novak' },
      ],
    },
    template: `<div style="padding:8px;background:var(--surface)"><ath-avatar-stack [users]="users" [max]="4" size="sm" /></div>`,
  }),
};
