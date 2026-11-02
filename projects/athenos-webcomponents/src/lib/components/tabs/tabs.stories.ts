import type { Meta, StoryObj } from '@storybook/angular';
import { LONG_TEXT, RTL_TEXT } from '../../stories/story-data';
import { AthTabsComponent, type TabItem } from './tabs.component';

const TABS: TabItem[] = [
  { id: 'activity', label: 'Activity', count: 12 },
  { id: 'subtasks', label: 'Subtasks', count: '3/5' },
  { id: 'links', label: 'Links' },
  { id: 'history', label: 'History', disabled: true },
];

const meta: Meta<AthTabsComponent> = {
  title: 'Layout/Tabs',
  component: AthTabsComponent,
  render: () => ({
    props: { tabs: TABS, active: 'activity' },
    template: `<ath-tabs [tabs]="tabs" [activeTab]="active" (tabChanged)="active = $event" />`,
  }),
};

export default meta;
type Story = StoryObj<AthTabsComponent>;

export const Default: Story = {};
export const LongText: Story = {
  render: () => ({
    props: {
      tabs: [
        { id: 'a', label: LONG_TEXT },
        { id: 'b', label: 'Short' },
      ],
      active: 'a',
    },
    template: `<div style="max-width:420px"><ath-tabs [tabs]="tabs" [activeTab]="active" (tabChanged)="active = $event" /></div>`,
  }),
};
export const RightToLeft: Story = {
  globals: { dir: 'rtl' },
  render: () => ({
    props: {
      tabs: [
        { id: 'a', label: RTL_TEXT, count: 4 },
        { id: 'b', label: 'سجل' },
      ],
      active: 'a',
    },
    template: `<ath-tabs [tabs]="tabs" [activeTab]="active" (tabChanged)="active = $event" />`,
  }),
};

/**
 * More tabs than fit (a project's ten tabs on a phone): the bar scrolls
 * sideways, a fade marks the side that has more, and the active tab is
 * scrolled into view.
 */
export const Overflow: Story = {
  render: () => ({
    props: {
      tabs: [
        'Overview',
        'Tickets',
        'Board',
        'Backlog',
        'Roadmap',
        'Releases',
        'Sprints',
        'Reports',
        'Members',
        'Settings',
      ].map((label) => ({ id: label.toLowerCase(), label })),
      active: 'reports',
    },
    template: `<div style="max-width:340px"><ath-tabs [tabs]="tabs" [activeTab]="active" (tabChanged)="active = $event" /></div>`,
  }),
};
