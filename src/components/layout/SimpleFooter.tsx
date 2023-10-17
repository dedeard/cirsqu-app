const SimpleFooter: React.FC = () => {
  return (
    <footer className="pb-10">
      <p className="text-center text-xs opacity-50">
        © {new Date().getFullYear()} All Right Reserved AjarBelajar - By{' '}
        <a href="https://dedeard.my.id" className="text-primary-600" target="_blank" rel="noreferrer">
          Dede ariansya
        </a>
      </p>
    </footer>
  )
}

export default SimpleFooter
