import './Footer.css'

const Footer = () => {
    return (
        <footer className="footer">
            <a className="footer-link" href="mailto:smalldatablog@gmail.com">
                <img className="footer-icon" style={{ height:'1.2em'}}src='\img\icons\mail.svg' alt='mail' />
            </a>
            <a className="footer-link" href="http://www.instagram.com/smalldatablog/" target="_blank">
                <img className="footer-icon" style={{position:'relative', top:'0.2em', height:'1.6em'}} src='\img\icons\instagram.svg' alt='mail' />
            </a>
            <a className="footer-link footer-link-right" href="https://github.com/tylerwu2222" target="_blank">
                <img className="footer-icon" style={{height:'1.3em'}} src='\img\icons\github.svg' alt='github' />
            </a>
            <a className="footer-link" href="https://www.youtube.com/channel/UCkGue8d6Y84Fh-HTVC_W9Zw/" target="_blank">
                <img className="footer-icon" style={{position:'relative', top:'0.2em', left:'0.1em',height:'1.7em'}} src='\img\icons\youtube.svg' alt='youtube' />
            </a>
        </footer>
    )
}

export default Footer;