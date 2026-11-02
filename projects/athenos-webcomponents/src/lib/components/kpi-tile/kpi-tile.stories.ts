import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { LONG_TEXT } from '../../stories/story-data';
import { AthKpiStripComponent, AthKpiTileComponent } from './kpi-tile.component';

const TREND = [2, 3, 3, 5, 4, 6, 8];

const meta: Meta<AthKpiTileComponent> = {
  title: 'Display/KPI tile',
  component: AthKpiTileComponent,
  decorators: [moduleMetadata({ imports: [AthKpiStripComponent] })],
  render: () => ({
    props: { trend: TREND },
    template: `
      <ath-kpi-strip [columns]="4">
        <ath-kpi-tile label="Due today" [value]="1" [alert]="true" delta="+1" deltaDirection="down" deltaTitle="1 overdue" />
        <ath-kpi-tile label="This week" [value]="3" tone="blue" [spark]="trend" />
        <ath-kpi-tile label="Story points" [value]="24" note="3 done" />
        <ath-kpi-tile label="In review" [value]="2" link="/app/tickets" [linkParams]="{ status: 'review' }" />
      </ath-kpi-strip>
    `,
  }),
};

export default meta;
type Story = StoryObj<AthKpiTileComponent>;

/** The strip as on Home: alert, trend, note and a linked tile. Two columns below 920px. */
export const Strip: Story = {};

export const Tones: Story = {
  render: () => ({
    props: { trend: TREND, tones: ['neutral', 'amber', 'blue', 'green', 'red'] },
    template: `
      <ath-kpi-strip [columns]="5">
        @for (t of tones; track t) {
          <ath-kpi-tile [label]="t" [value]="12" [tone]="t" [spark]="trend" delta="+2" deltaDirection="up" />
        }
      </ath-kpi-strip>
    `,
  }),
};

/**
 * Counts per status, as on a project's overview: the figure in the status
 * colour (`valueTone`, from the `--*-text` tokens), a status dot before the
 * label, and a progress bar projected under the figure.
 */
export const StatusCounts: Story = {
  render: () => ({
    template: `
      <ath-kpi-strip [columns]="4">
        <ath-kpi-tile label="Open" [value]="5" dot="var(--red)" />
        <ath-kpi-tile label="In progress" [value]="3" valueTone="amber" dot="var(--amber)" />
        <ath-kpi-tile label="In review" [value]="1" valueTone="blue" dot="var(--blue)" />
        <ath-kpi-tile label="Progress" value="62%">
          <span role="progressbar" aria-label="62% done" aria-valuemin="0" aria-valuemax="100" aria-valuenow="62"
            style="display:flex;height:4px;overflow:hidden;border-radius:999px;background:var(--bg-2)">
            <span style="width:62%;background:var(--green)"></span>
          </span>
        </ath-kpi-tile>
      </ath-kpi-strip>
    `,
  }),
};

export const MutedAndEmpty: Story = {
  render: () => ({
    template: `
      <ath-kpi-strip [columns]="3">
        <ath-kpi-tile label="Blocked" [value]="0" [muted]="true" />
        <ath-kpi-tile label="Unknown" [value]="null" />
        <ath-kpi-tile label="Text value" value="—" note="no data yet" />
      </ath-kpi-strip>
    `,
  }),
};

export const LongText: Story = {
  render: () => ({
    props: { text: LONG_TEXT },
    template: `
      <ath-kpi-strip [columns]="2">
        <ath-kpi-tile [label]="text" [value]="1234567" [note]="text" />
        <ath-kpi-tile label="Short" [value]="5" />
      </ath-kpi-strip>
    `,
  }),
};

/**
 * Notes as on a project's reports: the note sits under the figure in the
 * sans face and ends in an ellipsis when the tile is narrow (the full text
 * is its tooltip). A figure still loading (`null`) is a skeleton.
 */
export const NotesAndLoading: Story = {
  render: () => ({
    template: `
      <div style="max-width:720px">
        <ath-kpi-strip [columns]="4">
          <ath-kpi-tile label="Sprint progress" value="–" [muted]="true" note="No sprint to measure" />
          <ath-kpi-tile label="Average velocity" value="–" [muted]="true" note="No sprint finished yet" />
          <ath-kpi-tile label="Resolved" [value]="9" note="in the last 7 days" />
          <ath-kpi-tile label="Created" [value]="null" note="in the last 7 days" />
        </ath-kpi-strip>
      </div>
    `,
  }),
};
