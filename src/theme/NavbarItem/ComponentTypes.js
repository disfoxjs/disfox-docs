import ComponentTypes from '@theme-original/NavbarItem/ComponentTypes';
import LanguageSwitcher from '../../components/LanguageSwitcher';

// Registers "custom-languageSwitcher" as a navbar item type.
export default {
  ...ComponentTypes,
  'custom-languageSwitcher': LanguageSwitcher,
};
