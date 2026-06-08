import { type AnchorHTMLAttributes } from 'react'
import { toBrowserPath } from '../routing'

type RouteLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
  onNavigate: (path: string) => void
}

export function RouteLink({ href, onNavigate, ...props }: RouteLinkProps) {
  return (
    <a
      {...props}
      href={toBrowserPath(href)}
      onClick={(event) => {
        event.preventDefault()
        onNavigate(href)
      }}
    />
  )
}
