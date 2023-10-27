const SimpleFooter: React.FC = () => {
  return (
    <footer className="pb-10">
      <p className="text-center text-xs opacity-50">
        © {new Date().getFullYear()} CIRSQU - By{' '}
        <a href="https://dedeard.my.id" className="text-primary-600" target="_blank" rel="noopener noreferrer nofollow">
          Dede ariansya
        </a>
      </p>
    </footer>
  )
}

export default SimpleFooter
