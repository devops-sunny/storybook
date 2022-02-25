import {
  ModificationCategory,
  ModificationCategoryProps,
} from './ModificationCategory';
import { render, screen } from '@testing-library/react';

import { defaultThemePalette } from '@bb/order/common/testConstants';

const mockClickHandler = jest.fn();

const DISPLAY_NAME = 'Milk';
const CATEGORY_VALUE = 'Flavored';

const defaultProps: ModificationCategoryProps = {
  displayName: DISPLAY_NAME,
  imageUrl:
    'https://sfc-dev-us-media-assets-site-origin.s3.amazonaws.com/menu-item--americano.png',
  value: '',
  disabled: false,
  required: false,
};

describe('Given a <ModificationCategory /> with required props:', () => {
  describe('when it mounts:', () => {
    it('renders the provided image', () => {
      render(<ModificationCategory {...defaultProps} />);

      const categoryImg = screen.getByRole('img');
      expect(categoryImg).toHaveAttribute('src', defaultProps.imageUrl);
    });
    it('renders the provided displayName', () => {
      render(<ModificationCategory {...defaultProps} />);

      expect(
        screen.getByText(DISPLAY_NAME, { exact: false }),
      ).toBeInTheDocument();
    });
  });
});

describe('Given a <ModificationCategory> with optional prop (disabled):', () => {
  describe('when it mounts:', () => {
    it('renders the provided displayName with the disabled text theme color', () => {
      render(<ModificationCategory {...defaultProps} disabled />);

      const categoryTextStyle = window.getComputedStyle(
        screen.getByText(DISPLAY_NAME, { exact: false }),
      );
      expect(categoryTextStyle.color).toEqual(
        defaultThemePalette.palette.text.disabled,
      );
    });
  });
});

describe('Given a <ModificationCategory> with optional prop (required):', () => {
  describe('when it mounts:', () => {
    it('renders the provided displayName in bold italic', () => {
      render(<ModificationCategory {...defaultProps} required />);

      const categoryTextStyle = window.getComputedStyle(
        screen.getByText(DISPLAY_NAME, { exact: false }),
      );
      expect(categoryTextStyle.fontWeight).toEqual(
        defaultThemePalette.typography.fontWeightBold,
      );
      expect(categoryTextStyle.fontStyle).toEqual('italic');
    });

    it('renders the provided displayName with a trailing asterisk', () => {
      render(<ModificationCategory {...defaultProps} required />);

      const categoryTextStyle = window.getComputedStyle(
        screen.getByText(DISPLAY_NAME, { exact: false }),
      );
      screen.getByText(`${DISPLAY_NAME}*`);
    });
  });
});

describe('Given a <ModificationCategory> with optional props (value, disabled, required):', () => {
  describe('when it mounts:', () => {
    it('DOES NOT render the provided displayName', () => {
      render(
        <ModificationCategory
          {...defaultProps}
          value={CATEGORY_VALUE}
          disabled
          required
        />,
      );

      const displayName = screen.queryByText(DISPLAY_NAME, { exact: false });
      expect(displayName).not.toBeInTheDocument();
    });

    it('renders the provided value', () => {
      render(
        <ModificationCategory
          {...defaultProps}
          value={CATEGORY_VALUE}
          disabled
          required
        />,
      );

      expect(screen.getByText(CATEGORY_VALUE)).toBeInTheDocument();
    });

    it('renders the provided value with the disabled text theme color', () => {
      render(
        <ModificationCategory
          {...defaultProps}
          value={CATEGORY_VALUE}
          disabled
          required
        />,
      );

      const categoryTextStyle = window.getComputedStyle(
        screen.getByText(CATEGORY_VALUE),
      );
      expect(categoryTextStyle.color).toEqual(
        defaultThemePalette.palette.text.disabled,
      );
    });

    it('DOES NOT render the provided value in bold italic', () => {
      render(
        <ModificationCategory
          {...defaultProps}
          value={CATEGORY_VALUE}
          disabled
          required
        />,
      );

      const categoryTextStyle = window.getComputedStyle(
        screen.getByText(CATEGORY_VALUE),
      );
      expect(categoryTextStyle.fontWeight).not.toEqual(
        defaultThemePalette.typography.fontWeightBold,
      );
      expect(categoryTextStyle.fontStyle).not.toEqual('italic');
    });

    it('DOES NOT render the provided value with a trailing asterisk', () => {
      render(
        <ModificationCategory
          {...defaultProps}
          value={CATEGORY_VALUE}
          disabled
          required
        />,
      );

      const valueWithAestrics = screen.queryByText(`${CATEGORY_VALUE}*`);
      expect(valueWithAestrics).not.toBeInTheDocument();
    });
  });
});
