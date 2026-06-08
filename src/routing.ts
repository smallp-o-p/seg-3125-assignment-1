const appBasePath = import.meta.env.BASE_URL.replace(/\/$/, '')

export function toAppPath(pathname: string) {
  if (!appBasePath || !pathname.startsWith(appBasePath)) {
    return pathname
  }

  return pathname.slice(appBasePath.length) || '/'
}

export function toBrowserPath(path: string) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${appBasePath}${normalizedPath}`
}
