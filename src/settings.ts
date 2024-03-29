import { defaultsDeep } from 'lodash-es'
import type { RecursiveRequired, Settings } from '#/global'
import settingsDefault from '@/settings.default'

const globalSettings: Settings.all = {
  menu: {
    subMenuUniqueOpened: false,
  },
  toolbar: {
    navSearch: false,
    colorScheme: true,
    pageReload: true,
  },
  tabbar: {
    enable: true,
    enableIcon: true,
  },
}

export default defaultsDeep(globalSettings, settingsDefault) as RecursiveRequired<Settings.all>
