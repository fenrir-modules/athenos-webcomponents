import type { Meta, StoryObj } from '@storybook/angular';
import { LONG_TEXT } from '../../stories/story-data';
import { AthAvatarComponent } from '../avatar/avatar.component';
import { AthRoleBadgeComponent } from './role-badge.component';

const meta: Meta<AthRoleBadgeComponent> = {
  title: 'Data Display/Role badge',
  component: AthRoleBadgeComponent,
  args: { name: 'Developer', color: 'blue', size: 'md', locked: false },
  argTypes: {
    color: {
      control: 'select',
      options: ['neutral', 'accent', 'blue', 'green', 'amber', 'red', 'purple', 'pink'],
    },
    size: { control: 'inline-radio', options: ['sm', 'md'] },
  },
};

export default meta;
type Story = StoryObj<AthRoleBadgeComponent>;

export const Default: Story = {};
export const Fixed: Story = { args: { name: 'Owner', color: 'amber', locked: true } };
/**
 * Roles in two inks (UX tour A-06): the accent tint for Owner and Admin,
 * neutral for every other member, on every page that shows a role.
 */
export const TwoInks: Story = {
  render: () => ({
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:8px">
        <ath-role-badge name="Eigentümer" color="accent" />
        <ath-role-badge name="Admin" color="accent" />
        <ath-role-badge name="Mitglied" />
        <ath-role-badge name="Eigentümer" color="accent" size="sm" />
        <ath-role-badge name="Mitglied" size="sm" />
      </div>
    `,
  }),
};
/** Every role of a workspace, as in the members list. */
export const AllColours: Story = {
  render: () => ({
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:8px">
        <ath-role-badge name="Owner" color="amber" [locked]="true" />
        <ath-role-badge name="Admin" color="red" [locked]="true" />
        <ath-role-badge name="Product Owner" color="purple" />
        <ath-role-badge name="Developer" color="blue" />
        <ath-role-badge name="Tester" color="green" />
        <ath-role-badge name="Mitglied" color="neutral" />
        <ath-role-badge name="Gast" color="pink" size="sm" />
      </div>
    `,
  }),
};
/** The same colour as a ring on the avatar (`ath-avatar [ring]`). */
export const WithAvatarRing: Story = {
  render: () => ({
    moduleMetadata: { imports: [AthAvatarComponent] },
    template: `
      <div style="display:flex;align-items:center;gap:12px">
        <ath-avatar [person]="{ id: 'u-ada', name: 'Ada Lovelace' }" size="sm" ring="blue" />
        <span>Ada Lovelace</span>
        <ath-role-badge name="Developer" color="blue" size="sm" />
      </div>
    `,
  }),
};
export const LongName: Story = {
  render: () => ({
    props: { text: LONG_TEXT },
    template: `<div style="max-width:200px"><ath-role-badge [name]="text" color="green" /></div>`,
  }),
};
