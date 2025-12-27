import React from 'react'
import BlogList from '@/components/Blog/BlogList'
import HeroSub from '@/components/SharedComponent/HeroSub'

const BlogPage = () => {
  const breadcrumbLinks = [
    { href: '/', text: 'Home' },
    { href: '/blog', text: 'Blog' },
  ]
  return (
    <>
      <HeroSub
        title="Blog"
        description="Made for humans, by a human."
        breadcrumbLinks={breadcrumbLinks}
      />
      <BlogList />
    </>
  );
}

export default BlogPage
