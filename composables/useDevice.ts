import {useMediaQuery} from "@vueuse/core";

export const useDevice = () => {
  const isMobile = useMediaQuery('(max-width: 767px)')
  const isTablet = useMediaQuery('(max-width: 1024px)')
  const isDesktop = useMediaQuery('(max-width: 1216px)')
  const isWideScreen = useMediaQuery('(max-width: 1408px)')
  const isFullHD = useMediaQuery('(min-width: 1408px)')
  return {
    isMobile,
    isTablet,
    isDesktop,
    isWideScreen,
    isFullHD
  }
}
