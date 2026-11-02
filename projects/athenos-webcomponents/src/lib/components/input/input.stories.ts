import { FormsModule } from '@angular/forms';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { LONG_TEXT, RTL_TEXT } from '../../stories/story-data';
import { AthInputComponent } from './input.component';

const meta: Meta<AthInputComponent> = {
  title: 'Forms/Input',
  component: AthInputComponent,
  decorators: [moduleMetadata({ imports: [FormsModule] })],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
    },
    size: { control: 'select', options: ['sm', 'md'] },
  },
  args: {
    label: 'Email',
    placeholder: 'name@example.com',
    type: 'email',
    size: 'md',
    hint: '',
    error: '',
    disabled: false,
    readonly: false,
    required: false,
  },
  render: (args) => ({
    props: { ...args, value: '' },
    template: `
      <div style="max-width:320px">
        <ath-input [label]="label" [type]="type" [size]="size" [placeholder]="placeholder"
          [hint]="hint" [error]="error" [disabled]="disabled" [readonly]="readonly"
          [required]="required" [(ngModel)]="value" />
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<AthInputComponent>;

export const Default: Story = {};

export const WithHint: Story = { args: { hint: 'We never share your address.' } };

export const WithError: Story = { args: { error: 'Enter a valid email address', required: true } };

export const Disabled: Story = { args: { disabled: true } };

export const Readonly: Story = {
  render: () => ({
    props: { value: 'ada@example.com' },
    template: `<div style="max-width:320px"><ath-input label="Email" [readonly]="true" [(ngModel)]="value" /></div>`,
  }),
};

export const Password: Story = { args: { label: 'Password', type: 'password', placeholder: '' } };

export const Small: Story = { args: { size: 'sm' } };

export const LongText: Story = {
  render: () => ({
    props: { value: LONG_TEXT, label: LONG_TEXT },
    template: `
      <div style="max-width:280px">
        <ath-input [label]="label" [hint]="label" [(ngModel)]="value" />
      </div>
    `,
  }),
};

export const RightToLeft: Story = {
  globals: { dir: 'rtl' },
  render: () => ({
    props: { value: RTL_TEXT },
    template: `
      <div style="max-width:320px;display:grid;gap:12px">
        <ath-input label="الاسم" [(ngModel)]="value" hint="${RTL_TEXT}" />
        <ath-input label="كلمة المرور" type="password" />
      </div>
    `,
  }),
};

/** An error that wraps (password rules in a narrow column): the icon keeps its size at the first line. */
export const WrappedError: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: '',
    required: true,
    error: 'At least 12 characters with upper and lower case letters, a number and a symbol.',
  },
  render: (args) => ({
    props: { ...args, value: '' },
    template: `
      <div style="max-width:260px">
        <ath-input [label]="label" [type]="type" [error]="error" [required]="required" [(ngModel)]="value" />
      </div>
    `,
  }),
};
