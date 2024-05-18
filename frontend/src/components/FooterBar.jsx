import { Footer } from 'flowbite-react';

const FooterBar = () => {
    return (
        <Footer container className='py-4 rounded-none mt-4'>
            <Footer.Copyright
                by="Foorum"
                href="/"
                year={2024}
            />
        </Footer>
    )
}

export default FooterBar;