import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { LONG_TEXT, RTL_TEXT } from '../../stories/story-data';
import { AthButtonComponent } from '../button/button.component';
import { AthInputComponent } from '../input/input.component';
import { AthOptionPickerComponent } from '../listbox/option-picker.component';
import { AthDialogComponent } from './dialog.component';

const meta: Meta<AthDialogComponent> = {
  title: 'Overlays/Dialog',
  component: AthDialogComponent,
  decorators: [
    moduleMetadata({ imports: [AthButtonComponent, AthOptionPickerComponent, AthInputComponent] }),
  ],
  parameters: { visual: { mode: 'viewport' } },
  argTypes: { size: { control: 'select', options: ['sm', 'md', 'lg', 'xl', 'full'] } },
  args: { size: 'md', closeOnBackdrop: true, closeOnEscape: true },
  render: (args) => ({
    props: {
      ...args,
      open: true,
      options: [
        { value: 'low', label: 'Low' },
        { value: 'high', label: 'High' },
      ],
    },
    template: `
      <ath-button (clicked)="open = true">Open dialog</ath-button>
      <ath-dialog [(open)]="open" title="Create ticket" description="Fields marked * are required"
                  [size]="size" [closeOnBackdrop]="closeOnBackdrop" [closeOnEscape]="closeOnEscape">
        <ath-input label="Title" [required]="true" />
        <div style="margin-top:12px"><ath-option-picker [options]="options" placeholder="Priority" ariaLabel="Priority" /></div>
        <div slot="footer">
          <ath-button variant="ghost" (clicked)="open = false">Cancel</ath-button>
          <ath-button (clicked)="open = false">Create</ath-button>
        </div>
      </ath-dialog>
    `,
  }),
};

export default meta;
type Story = StoryObj<AthDialogComponent>;

/** Open on load: header, body with a picker (its panel floats above the dialog), footer. */
export const Default: Story = {};

export const Small: Story = { args: { size: 'sm' } };
export const Large: Story = { args: { size: 'lg' } };

/** A long body scrolls inside; header and footer stay. */
export const LongContent: Story = {
  render: () => ({
    props: { open: true, paragraphs: Array.from({ length: 24 }, () => LONG_TEXT) },
    template: `
      <ath-dialog [(open)]="open" title="Terms" size="md">
        @for (p of paragraphs; track $index) { <p>{{ p }}</p> }
        <div slot="footer"><ath-button (clicked)="open = false">Accept</ath-button></div>
      </ath-dialog>
    `,
  }),
};

/** `role="alertdialog"` for a destructive confirmation. */
export const Confirm: Story = {
  render: () => ({
    props: { open: true },
    template: `
      <ath-dialog [(open)]="open" role="alertdialog" title="Delete ticket?" description="This cannot be undone." size="sm">
        <div slot="footer">
          <ath-button variant="ghost" (clicked)="open = false">Cancel</ath-button>
          <ath-button variant="danger" (clicked)="open = false">Delete</ath-button>
        </div>
      </ath-dialog>
    `,
  }),
};

/**
 * `bare`: the content is the surface and places itself (here a palette at
 * the top); the dialog keeps the scrim, the focus trap, Escape and the
 * backdrop click on the layer around it.
 */
export const Bare: Story = {
  render: () => ({
    props: { open: true },
    template: `
      <ath-dialog [(open)]="open" bare ariaLabel="Command palette">
        <div style="width:min(560px, calc(100% - 32px));margin:12vh auto 0;background:var(--surface);border:1px solid var(--border);border-radius:var(--r-lg);box-shadow:var(--shadow-3);overflow:hidden">
          <input aria-label="Search commands" placeholder="Type a command" style="box-sizing:border-box;width:100%;padding:12px 16px;font:inherit;border:0;border-bottom:1px solid var(--border);background:transparent;color:var(--fg)" />
          <p style="margin:0;padding:12px 16px;color:var(--fg-3)">Recent: Open settings</p>
        </div>
      </ath-dialog>
    `,
  }),
};

/** Closed: only the opener button. */
export const Closed: Story = {
  parameters: { visual: { mode: 'content' } },
  render: () => ({
    props: { open: false },
    template: `
      <ath-button (clicked)="open = true">Open dialog</ath-button>
      <ath-dialog [(open)]="open" title="Hello"><p>Body</p></ath-dialog>
    `,
  }),
};

export const RightToLeft: Story = {
  globals: { dir: 'rtl' },
  render: () => ({
    props: { open: true, text: RTL_TEXT },
    template: `<ath-dialog [(open)]="open" [title]="text" [description]="text" size="sm"><p>{{ text }}</p></ath-dialog>`,
  }),
};

export const GermanLabels: Story = {
  globals: { labels: 'de' },
  render: () => ({
    props: { open: true },
    template: `<ath-dialog [(open)]="open" title="Ticket bearbeiten" size="sm"><p>Der Schließen-Knopf heißt „Dialog schließen“.</p></ath-dialog>`,
  }),
};
