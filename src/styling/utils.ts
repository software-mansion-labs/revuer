export const utils = {
  contentX: (value: 'start' | 'center' | 'end') => {
    return {
      display: 'flex',
      justifyContent: {
        start: 'flex-start',
        center: 'center',
        end: 'flex-end',
      }[value],
    }
  },
  contentY: (value: 'start' | 'center' | 'end') => {
    return {
      display: 'flex',
      alignItems: {
        start: 'flex-start',
        center: 'center',
        end: 'flex-end',
      }[value],
    }
  },
  absoluteFill: (value: boolean) => {
    if (!value) return {}
    return {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    }
  },
}
