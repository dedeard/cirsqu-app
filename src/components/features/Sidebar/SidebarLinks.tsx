import React from 'react'
import SidebarLink, { SidebarLinkPropTypes, SidebarLinkSkeleton } from './SidebarLink'

const SidebarLinks: React.FC<{ links: SidebarLinkPropTypes[]; skeletonCount?: number }> = ({ links, skeletonCount }) => {
  return (
    <nav role="navigation" className="flex flex-col gap-1 p-0 pb-5">
      {links.map((link, i) => (
        <SidebarLink key={i} {...link} />
      ))}
      {skeletonCount && (
        <div className="flex flex-col gap-1 pb-5">
          {Array.from(Array(skeletonCount).keys()).map((i) => (
            <SidebarLinkSkeleton key={i} />
          ))}
        </div>
      )}
    </nav>
  )
}

export default SidebarLinks
