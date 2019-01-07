import * as React from 'react';
import { Page } from './components/Page';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { Container } from './components/Container';
import { Content } from './components/Content';
import PrivacyIcon from 'openland-icons/landing/privacy-icon.svg';

const SectionsList = [
    'Welcome to&nbsp;Openland',
    'How we&nbsp;use your personal data',
    'Managing your personal data',
    'Recipients of&nbsp;collected data',
    'Security',
    'Cookies',
    'Children',
    'Policy changes',
    'Contact&nbsp;us',
];

export default class PrivacyPage extends React.Component {
    render() {
        return (
            <Page withBorder={true}>
                <XDocumentHead title="Privacy Policy" titleWithoutReverse={true} />
                <Container>
                    <Content
                        title="Privacy Policy"
                        date="July 9, 2018"
                        icon={<PrivacyIcon />}
                        contents={SectionsList}
                    >
                        <h2 id="section1">Welcome to&nbsp;Openland</h2>
                        <p>
                            Openland is&nbsp;committed to&nbsp;protect your privacy, as&nbsp;you use
                            our service. We&nbsp;want you to&nbsp;understand how we&nbsp;use your
                            personal information and how you can control&nbsp;it. All references
                            to&nbsp;&ldquo;we&rdquo;,&nbsp;&ldquo;us&rdquo;, &ldquo;our&rdquo;,
                            or&nbsp;&ldquo;Openland&rdquo; refer to&nbsp;Data Makes Perfect Inc.,
                            a&nbsp;Delaware corporation operating openland. com website and
                            associated information services.
                        </p>
                        <p>
                            By&nbsp;continuing to&nbsp;use Openland, you acknowledge that you have
                            had the chance to&nbsp;review and consider this Privacy Policy, and you
                            acknowledge that you agree to&nbsp;it. This means that you expressly
                            give your consent for the use of&nbsp;your personal data and the methods
                            of&nbsp;disclosure as&nbsp;described in&nbsp;this Privacy Policy.
                            If&nbsp;you do&nbsp;not understand the Privacy Policy
                            or&nbsp;do&nbsp;not agree to&nbsp;one or&nbsp;more provisions
                            of&nbsp;this Privacy Policy, please immediately cease your use
                            of&nbsp;Openland.
                        </p>
                        <h2 id="section2">How we&nbsp;use your personal data</h2>
                        <p>
                            Your personal data is&nbsp;collected based one or&nbsp;several
                            of&nbsp;the following requirements:
                        </p>
                        <ul>
                            <li>
                                To&nbsp;manage your access to&nbsp;and use of&nbsp;Openland services
                            </li>
                            <li>To&nbsp;provide customer support and improve the application</li>
                            <li>
                                To&nbsp;provide product updates and inform you about features that
                                you may be&nbsp;interested&nbsp;in
                            </li>
                            <li>
                                To&nbsp;carry out customer management, including billing and
                                contracts
                            </li>
                            <li>
                                To&nbsp;provide service use statistics and aggregate-level trends
                            </li>
                            <li>To&nbsp;respect our legal and regulatory obligations</li>
                        </ul>
                        <h2 id="section3">
                            Accessing, updating, or&nbsp;removing your personal data
                        </h2>
                        <p>
                            At&nbsp;any time, you may review or&nbsp;change the personal data
                            in&nbsp;your Openland user settings. If&nbsp;you would like
                            to&nbsp;delete your personal data entirely, please send&nbsp;us
                            an&nbsp;email to{' '}
                            <a href="mailto:hello@openland.com">hello@openland.com</a>. Upon your
                            request to&nbsp;terminate your user account, we&nbsp;will deactivate
                            or&nbsp;delete your account and information from our active databases
                            within a&nbsp;reasonable timeframe.
                        </p>
                        <h2 id="section4">Recipients of&nbsp;collected data</h2>
                        <p>
                            Only our employees and the services we&nbsp;use may have access
                            to&nbsp;your personal data. As&nbsp;part of&nbsp;its functionality,
                            Openland may utilize third party services, such as&nbsp;hosting
                            services, analytics providers, communications services, and other
                            vendors. We&nbsp;only share your information with third parties
                            to&nbsp;the extent necessary for Openland service operations.
                            We&nbsp;have no&nbsp;control over such third parties. Thus, we&nbsp;make
                            no&nbsp;guarantees about, and assume no&nbsp;responsibility for the
                            information, services, or&nbsp;privacy practices of&nbsp;these
                            third-party service providers. Government agencies may also
                            be&nbsp;recipients of&nbsp;your personal data, exclusively to&nbsp;meet
                            legal obligations. We&nbsp;are not selling or&nbsp;leasing out your
                            personal data to&nbsp;third parties.
                        </p>
                        <h2 id="section5">Security</h2>
                        <p>
                            We&nbsp;use reasonable efforts and safeguards to&nbsp;secure your
                            information and to&nbsp;attempt to&nbsp;prevent the loss, misuse, and
                            alteration of&nbsp;the information that we&nbsp;obtain from you.
                            In&nbsp;addition, we&nbsp;rely on&nbsp;the technical safeguards,
                            provided by&nbsp;the third party vendors we&nbsp;use to&nbsp;host,
                            store, and process your information. However, you acknowledge and agree
                            that loss, misuse, and alteration may occur despite our efforts
                            to&nbsp;protect your information. To&nbsp;the extent permitted
                            by&nbsp;law, we&nbsp;are not responsible to&nbsp;our users
                            or&nbsp;to&nbsp;any third party due to&nbsp;any such loss, misuse,
                            or&nbsp;alteration.
                        </p>
                        <h2 id="section6">Cookies</h2>
                        <p>
                            Openland uses cookies to&nbsp;deliver its services. Cookies are small
                            files stored on&nbsp;your computer or&nbsp;mobile device which collect
                            information about your browsing behavior. We&nbsp;use cookies
                            to&nbsp;help&nbsp;us remember information about your account and saving
                            your preferences for future visits. We&nbsp;also use cookies
                            to&nbsp;help&nbsp;us understand aggregate data about Openland site
                            visitors so&nbsp;that we&nbsp;can offer better experiences and tools
                            in&nbsp;the future. Openland may use trusted third-party services that
                            track this information on&nbsp;our behalf. Most internet browsers accept
                            cookies automatically, although you are able to&nbsp;control cookies
                            from your browser settings, including changing whether or&nbsp;not you
                            accept them, or&nbsp;removing them entirely.
                        </p>
                        <h2 id="section7">Children</h2>
                        <p>
                            The Service is&nbsp;not directed to&nbsp;children under the age
                            of&nbsp;13&nbsp;and we&nbsp;do&nbsp;not knowingly collect personally
                            identifiable information from children under the age of&nbsp;13.
                            If&nbsp;we&nbsp;learn that we&nbsp;have collected personally
                            identifiable information of&nbsp;a&nbsp;child under the age&nbsp;13,
                            we&nbsp;will take reasonable steps to&nbsp;delete such information from
                            our files as&nbsp;soon as&nbsp;possible.
                        </p>
                        <h2 id="section8">Policy changes</h2>
                        <p>
                            Openland reserves the right to&nbsp;change this Privacy Policy from time
                            to&nbsp;time. Any changes to&nbsp;this Privacy Policy will become
                            effective on&nbsp;the &ldquo;Effective Date&rdquo; indicated above.
                            If&nbsp;you continue to&nbsp;use the service after those changes took
                            effect, you consent to&nbsp;the new Policy. Openland will always have
                            the latest Policy posted on&nbsp;the Service.
                        </p>
                        <h2 id="section9">Contact&nbsp;us</h2>
                        <p>
                            If&nbsp;you have comments or&nbsp;questions about our Privacy Policy,
                            please reach out by&nbsp;email at{' '}
                            <a href="mailto:hello@openland.com">hello@openland.com</a> or&nbsp;send
                            physical mail to: Openland, 100 Van Ness #2305, San Francisco,
                            CA&nbsp;94102, USA.
                        </p>
                    </Content>
                </Container>
            </Page>
        );
    }
}
