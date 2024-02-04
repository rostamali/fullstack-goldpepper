import Link from 'next/link';
import Logo from '../elements/logo';
import { Facebook, Linkedin } from 'lucide-react';

const RootFooter = () => {
	return (
		<footer id="footer" className="bg-primary-gray pb-[60px] pt-[80px]">
			<div className="container">
				<div className="footer__infos flex items-center justify-between border-b pb-[30px] border-b-default-border-light border-opacity-50">
					<Logo className={'h-[60px] w-[60px] invert-[100%]'} />
					<ul className="flex items-center gap-2">
						<li className="text-[16px] uppercase font-semibold text-default-gray-light text-gray-light">
							FOLLOW US
						</li>
						<li className="">
							<Link href="/" className="text-gray-light">
								<Facebook size={24} />
							</Link>
						</li>
						<li className="">
							<Link href="/" className="text-gray-light">
								<Linkedin size={24} />
							</Link>
						</li>
					</ul>
				</div>
				<div className="footer__links pt-[30px] w-full flex flex-col sm:flex-row items-start sm:items-center justify-between">
					<ul className="flex items-center gap-4">
						<li>
							<Link
								href="/"
								className="text-base-1 text-gray-muted uppercase"
							>
								PRIVACY POLICY
							</Link>
						</li>
						<li>
							<Link
								href="/"
								className="text-base-1 text-gray-muted uppercase"
							>
								TERMS OF USE
							</Link>
						</li>
					</ul>
					<div className="text-base-1 text-gray-muted">
						&copy; 2023 Gold & Pepper
					</div>
				</div>
			</div>
			<script type="text/javascript" src="/assets/dom.js"></script>
		</footer>
	);
};

export default RootFooter;
