import type { Meta, StoryObj } from '@storybook/angular';
import { Inbox, MoreHorizontal } from 'lucide';
import { LONG_TEXT } from '../../stories/story-data';
import { AthNavItemComponent } from './nav-item.component';

const meta: Meta<AthNavItemComponent> = {
  title: 'Layout/Nav item',
  component: AthNavItemComponent,
  args: { label: 'Inbox', route: '/inbox', compact: false, badge: 3 },
  render: (args) => ({
    props: { ...args, Inbox },
    template: `
      <nav aria-label="Main" style="width:220px;display:flex;flex-direction:column">
        <ath-nav-item [icon]="Inbox" [label]="label" [route]="route" [compact]="compact" [badge]="badge" />
      </nav>
    `,
  }),
};

export default meta;
type Story = StoryObj<AthNavItemComponent>;

export const Default: Story = {};
/** A collapsed rail: the label folds away, an unread count becomes a dot. */
export const Collapsed: Story = {
  args: { compact: true },
  render: (args) => ({
    props: { ...args, Inbox },
    template: `
      <nav aria-label="Main" style="width:56px;display:flex;flex-direction:column">
        <ath-nav-item [icon]="Inbox" [label]="label" [route]="route" [compact]="compact" [badge]="badge" />
      </nav>
    `,
  }),
};
/** Project rows: the key in the project's colour instead of an icon, then a muted row. */
export const ProjectRows: Story = {
  render: () => ({
    props: {
      MoreHorizontal,
      atlas: { text: 'ATL', color: 'var(--blue)' },
      web: { text: 'WEB', color: 'var(--green)' },
    },
    template: `
      <nav aria-label="Projects" style="width:220px;display:flex;flex-direction:column">
        <ath-nav-item [chip]="atlas" label="Atlas" route="/projects/atlas" />
        <ath-nav-item [chip]="web" label="Website relaunch" route="/projects/web" />
        <ath-nav-item [icon]="MoreHorizontal" label="All projects" route="/projects" [exact]="true" [muted]="true" />
      </nav>
    `,
  }),
};
export const LongText: Story = { args: { label: LONG_TEXT, badge: 128 } };

/** Project keys in every colour the app hashes a project into: the key text clears 4.5:1 in both themes. */
export const ProjectPalette: Story = {
  render: () => ({
    props: {
      rows: [
        { chip: { text: 'WEB', color: 'var(--accent)' }, label: 'Web' },
        { chip: { text: 'API', color: 'var(--blue)' }, label: 'Platform API' },
        { chip: { text: 'MOB', color: 'var(--green)' }, label: 'Mobile app' },
        { chip: { text: 'OPS', color: 'var(--amber)' }, label: 'Infrastructure' },
        { chip: { text: 'DOC', color: 'var(--purple)' }, label: 'Handbook' },
      ],
    },
    template: `
      <nav aria-label="Projects" style="width:220px;display:flex;flex-direction:column;background:var(--bg-1)">
        @for (r of rows; track r.label) {
          <ath-nav-item [chip]="r.chip" [label]="r.label" [route]="'/projects/' + r.chip.text" />
        }
      </nav>
    `,
  }),
};
/** A collapsed rail of several rows: icons, the active pill and an unread dot. */
export const Rail: Story = {
  render: () => ({
    props: { Inbox, MoreHorizontal },
    template: `
      <nav aria-label="Main" style="width:56px;display:flex;flex-direction:column;background:var(--bg-1)">
        <ath-nav-item [icon]="Inbox" label="Inbox" route="/inbox" [compact]="true" [badge]="6" />
        <ath-nav-item [icon]="MoreHorizontal" label="More" route="/more" [compact]="true" />
      </nav>
    `,
  }),
};
