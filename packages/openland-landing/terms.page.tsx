import * as React from 'react';
import { Page } from './components/Page';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { Content } from './components/Content';
import TermsIcon from 'openland-icons/landing/terms-icon.svg';
import { Container } from './components/Container';

const SectionsList = [
    'Welcome to&nbsp;Openland',
    'Legally binding agreement',
    'Eligibility',
    'Account responsibility',
    'Your Content',
    'Marketing',
    'Prohibited uses',
    'Intellectual property',
    'No&nbsp;support obligations',
    'Links',
    'International use',
    'Enforcement',
    'Disclaimer of&nbsp;warranties',
    'Limitation of&nbsp;liability',
    'Indemnification',
    'Severability waiver',
    'Dispute resolution',
    'Electronic notices',
    'Term and termination',
    'Updates to&nbsp;the Terms of&nbsp;Service',
    'Contact&nbsp;us',
];

export default class TermsPage extends React.Component {
    render() {
        return (
            <Page withBorder={true}>
                <XDocumentHead title="Terms of Service" titleWithoutReverse={true} />
                <Container>
                    <Content
                        title="Terms of Service"
                        date="July 9, 2018"
                        icon={<TermsIcon />}
                        contents={SectionsList}
                    >
                        <h2 id="section1">Welcome to&nbsp;Openland</h2>
                        <p>
                            Thank you for your interest in&nbsp;Openland. All references
                            to&nbsp;&ldquo;Service&rdquo;, &ldquo;Company&rdquo;,
                            &ldquo;Site&rdquo;, &ldquo;we&rdquo;,&nbsp;&ldquo;us&rdquo;,
                            &ldquo;our&rdquo;, or&nbsp;&ldquo;Openland&rdquo; refer to&nbsp;Data
                            Makes Perfect Inc., a&nbsp;Delaware corporation operating openland. com
                            website, along with related websites, mobile applications, and other
                            associated services.
                        </p>
                        <h2 id="section2">These Terms are a legally binding agreement</h2>
                        <p>
                            By&nbsp;clicking &ldquo;I&nbsp;Accept&rdquo;, creating an&nbsp;account,
                            downloading, installing, or&nbsp;otherwise accessing or&nbsp;using the
                            Service, you agree that you have read and understood, and,
                            as&nbsp;a&nbsp;condition to&nbsp;your use of&nbsp;the service, you
                            irrevocably agree to&nbsp;be&nbsp;bound&nbsp;by, the following terms and
                            conditions, including Openland&rsquo;s{' '}
                            <a href="/privacy">Privacy Policy</a> (together, these
                            &ldquo;Terms&rdquo;).
                        </p>
                        <p>
                            If&nbsp;you do&nbsp;not agree to&nbsp;the Terms, then you do&nbsp;not
                            have our permission to&nbsp;use the service. Your use of&nbsp;the
                            Service, and Openland&rsquo;s provision of&nbsp;the Service to&nbsp;you,
                            constitutes an&nbsp;agreement by&nbsp;Openland and by&nbsp;you
                            (on&nbsp;behalf of&nbsp;yourself or&nbsp;the entity that you represent)
                            to&nbsp;be&nbsp;bound by&nbsp;these Terms. Your use of&nbsp;Service also
                            represents and warrants that you have the right, authority, and capacity
                            to&nbsp;enter into these Terms (on&nbsp;behalf of&nbsp;yourself
                            or&nbsp;the entity that you represent).
                        </p>
                        <h2 id="section3">Eligibility</h2>
                        <p>
                            By&nbsp;agreeing to&nbsp;these Terms, you represent and warrant
                            to&nbsp;us that: (a) is&nbsp;a&nbsp;legal entity
                            or&nbsp;an&nbsp;individual who is&nbsp;capable of&nbsp;forming legally
                            binding agreements under applicable law; (b) you have not previously
                            been suspended or&nbsp;removed from the Service; and &copy;&nbsp;your
                            registration and your use of&nbsp;the Service is&nbsp;in&nbsp;compliance
                            with any and all applicable laws and regulations. If&nbsp;you are
                            an&nbsp;entity, organization, or&nbsp;company, the individual accepting
                            these Terms on&nbsp;your behalf represents and warrants that they have
                            authority to&nbsp;bind you to&nbsp;these Terms and you agree
                            to&nbsp;be&nbsp;bound by&nbsp;these Terms.
                        </p>
                        <h2 id="section4">Account responsibility</h2>
                        <p>
                            If&nbsp;you are signing up&nbsp;for the Service, you must register for
                            an&nbsp;account (or&nbsp;permit Openland to&nbsp;register
                            an&nbsp;account on&nbsp;your behalf). When you register for
                            an&nbsp;account, you may be&nbsp;required to&nbsp;provide&nbsp;us with
                            some information about yourself, such as&nbsp;your name, email address,
                            and mobile number. You agree that the information you provide to&nbsp;us
                            is&nbsp;accurate and that you will keep it&nbsp;accurate and up-to-date
                            at&nbsp;all times.
                        </p>
                        <p>
                            When you register, you may be&nbsp;asked to&nbsp;provide
                            a&nbsp;password. You are solely responsible for maintaining the
                            confidentiality of&nbsp;your account information and are fully
                            responsible for all activities that occur under your Account. You agree
                            to&nbsp;immediately notify Company of&nbsp;any unauthorized use,
                            or&nbsp;suspected unauthorized use of&nbsp;your Account or&nbsp;any
                            other breach of&nbsp;security. Openland cannot and will not
                            be&nbsp;liable for any loss or&nbsp;damage arising from your failure
                            to&nbsp;comply with the above requirements. If&nbsp;you believe that
                            your account is&nbsp;no&nbsp;longer secure, then you must immediately
                            notify&nbsp;us at{' '}
                            <a href="mailto:hello@openland.com">hello@openland.com</a>.
                        </p>
                        <h2 id="section5">Your Content</h2>
                        <p>
                            &ldquo;User Content&rdquo; means any and all information and content
                            that a&nbsp;user submits&nbsp;to, or&nbsp;uses with, the Site
                            (e.&nbsp;g., content in&nbsp;the user&rsquo;s profile or&nbsp;postings).
                            You are solely responsible for your User Content. You assume all risks
                            associated with use of&nbsp;your User Content, including any reliance
                            on&nbsp;its accuracy, completeness or&nbsp;usefulness by&nbsp;others,
                            or&nbsp;any disclosure of&nbsp;your User Content that personally
                            identifies you or&nbsp;any third party. You may not represent
                            or&nbsp;imply to&nbsp;others that your User Content is&nbsp;in&nbsp;any
                            way provided, sponsored or&nbsp;endorsed by&nbsp;Company. Company
                            is&nbsp;not obligated to&nbsp;backup any User Content, and your User
                            Content may be&nbsp;deleted at&nbsp;any time without prior notice. You
                            are solely responsible for creating and maintaining your own backup
                            copies of&nbsp;your User Content if&nbsp;you desire.
                        </p>
                        <p>
                            You represent and warrant that you have and will maintain all rights
                            necessary to&nbsp;grant to&nbsp;Openland the rights granted
                            in&nbsp;these Terms, and by&nbsp;providing your User Content
                            to&nbsp;Openland in&nbsp;accordance with the Terms, you will not violate
                            any Intellectual Property Rights of&nbsp;third parties, confidential
                            relationships, contractual obligations or&nbsp;laws.
                        </p>
                        <p>
                            You hereby grant (and you represent and warrant that you have the right
                            to&nbsp;grant) to&nbsp;Company an&nbsp;irrevocable, nonexclusive,
                            royalty-free and fully paid, worldwide license to&nbsp;reproduce,
                            distribute, publicly display and perform, prepare derivative
                            works&nbsp;of, incorporate into other works, and otherwise use and
                            exploit your User Content, and to&nbsp;grant sublicenses of&nbsp;the
                            foregoing rights, solely for the purposes of&nbsp;including your User
                            Content in&nbsp;the Site. You hereby irrevocably waive (and agree
                            to&nbsp;cause to&nbsp;be&nbsp;waived) any claims and assertions
                            of&nbsp;moral rights or&nbsp;attribution with respect to&nbsp;your User
                            Content.
                        </p>
                        <h2 id="section6">Marketing</h2>
                        <p>
                            Unless explicitly granted an&nbsp;exception, you agree to&nbsp;allow
                            Openland to&nbsp;use and display your organization&rsquo;s logo and name
                            on&nbsp;our website and in&nbsp;other promotional materials.
                        </p>
                        <h2 id="section7">Prohibited uses</h2>
                        <p>
                            You may use the Services only for lawful purposes and in&nbsp;accordance
                            with the Terms in&nbsp;their entirety.
                        </p>
                        <p>You agree not to&nbsp;use the Service:</p>
                        <ul>
                            <li>
                                In&nbsp;any way that violates any applicable federal, state, local,
                                or&nbsp;international law or&nbsp;regulation.
                            </li>
                            <li>
                                In&nbsp;any way that infringes upon the rights of&nbsp;others,
                                or&nbsp;in&nbsp;any way is&nbsp;illegal, threatening, fraudulent,
                                or&nbsp;harmful, or&nbsp;in&nbsp;connection with any unlawful,
                                illegal, fraudulent, or&nbsp;harmful purpose or&nbsp;activity.
                            </li>
                            <li>
                                To&nbsp;impersonate or&nbsp;attempt to&nbsp;impersonate another
                                user, Openland employee, any other person, or&nbsp;entity.
                            </li>
                            <li>
                                To&nbsp;engage in&nbsp;any other conduct that restricts
                                or&nbsp;inhibits anyone&rsquo;s use or&nbsp;enjoyment of&nbsp;the
                                Service, or&nbsp;which, as&nbsp;determined by&nbsp;us, may harm
                                or&nbsp;offend the Company or&nbsp;users of&nbsp;the Service.
                            </li>
                        </ul>
                        <p>Additionally, you agree not&nbsp;to:</p>
                        <ul>
                            <li>
                                Use the Service in&nbsp;any manner that could disable, overburden,
                                damage, or&nbsp;impair the Service or&nbsp;interfere with any other
                                party&rsquo;s use of&nbsp;the Service.
                            </li>
                            <li>
                                Use any robot, spider, or&nbsp;other automatic device, process,
                                or&nbsp;means to&nbsp;access the Service for any purpose, including
                                monitoring or&nbsp;copying any of&nbsp;the material on&nbsp;the
                                Service.
                            </li>
                            <li>
                                Use any manual process to&nbsp;monitor or&nbsp;copy any of&nbsp;the
                                material on&nbsp;the Service or&nbsp;for any other unauthorized
                                purpose without our prior written consent.
                            </li>
                            <li>
                                Attempt to&nbsp;gain unauthorized access&nbsp;to, interfere with,
                                damage, or&nbsp;disrupt any parts of&nbsp;the Service, the server
                                on&nbsp;which the Service is&nbsp;stored, or&nbsp;any server,
                                computer, or&nbsp;database connected to&nbsp;the Service.
                            </li>
                            <li>
                                Attack the Service via a&nbsp;denial-of-service attack
                                or&nbsp;a&nbsp;distributed denial-of-service attack.
                            </li>
                            <li>
                                Otherwise attempt to&nbsp;interfere with the proper working
                                of&nbsp;the Service.
                            </li>
                        </ul>
                        <h2 id="section8">Intellectual property</h2>
                        <p>
                            Openland retains the property rights over its pre-existing works
                            (including the Intellectual Property Rights), as&nbsp;well
                            as&nbsp;of&nbsp;all or&nbsp;part of&nbsp;its materials, information,
                            tools, methods, systems, equipment, hardware and software,
                            documentation, data, databases, files of&nbsp;all types, made available
                            to&nbsp;you and your entity within the framework of&nbsp;this Agreement.
                            Consequently, Customer will only have a&nbsp;right of&nbsp;access
                            strictly limited to&nbsp;their individual or&nbsp;organizational use
                            of&nbsp;the Service.
                        </p>
                        <p>
                            For the avoidance of&nbsp;doubt, except as&nbsp;expressly provided
                            in&nbsp;this Agreement, your access and use to&nbsp;the Services does
                            not convey any rights (including Intellectual Property Rights)
                            or&nbsp;ownership, either express or&nbsp;implied, in&nbsp;all
                            or&nbsp;part&nbsp;of (a) the services; (b) the software; &copy;&nbsp;the
                            site; or&nbsp;(d) any related documentation.
                        </p>
                        <h2 id="section9">No support obligations</h2>
                        <p>
                            We&nbsp;are under no&nbsp;obligation to&nbsp;provide support for the
                            Service. In&nbsp;instances where we&nbsp;may offer support, the support
                            will be&nbsp;subject to&nbsp;published policies.
                        </p>
                        <h2 id="section10">Links</h2>
                        <p>
                            Openland has not reviewed all of&nbsp;the sites linked to&nbsp;its
                            website and is&nbsp;not responsible for the contents of&nbsp;any such
                            linked site. The inclusion of&nbsp;any link does not imply endorsement
                            by&nbsp;Openland of&nbsp;the site. Use of&nbsp;any such linked website
                            is&nbsp;at&nbsp;the user&rsquo;s own risk.
                        </p>
                        <h2 id="section11">International use</h2>
                        <p>
                            The Service is&nbsp;intended for visitors located within the United
                            States. We&nbsp;make no&nbsp;representation that the Service
                            is&nbsp;appropriate or&nbsp;available for use outside of&nbsp;the United
                            States. You agree that you will not use the Service in&nbsp;any country
                            or&nbsp;in&nbsp;any manner prohibited by&nbsp;any applicable laws,
                            restrictions or&nbsp;regulations.
                        </p>
                        <h2 id="section12">Enforcement</h2>
                        <p>We&nbsp;have the right&nbsp;to:</p>
                        <ul>
                            <li>
                                Take any action with respect to&nbsp;any user that we&nbsp;deem
                                necessary or&nbsp;appropriate in&nbsp;our sole discretion, including
                                if&nbsp;we&nbsp;believe that such user violates the Terms, infringes
                                any intellectual property right or&nbsp;other right of&nbsp;any
                                person or&nbsp;entity, threatens the personal safety of&nbsp;users
                                of&nbsp;the Service or&nbsp;the public, or&nbsp;could create
                                liability for the Company.
                            </li>
                            <li>
                                Disclose your identity or&nbsp;other information about you
                                to&nbsp;any third party who claims that material posted by&nbsp;you
                                violates their rights, including their intellectual property rights
                                or&nbsp;their right to&nbsp;privacy.
                            </li>
                            <li>
                                Take appropriate legal action, including without limitation,
                                referral to&nbsp;law enforcement, for any illegal
                                or&nbsp;unauthorized use of&nbsp;the Service.
                            </li>
                            <li>
                                Terminate or&nbsp;suspend your access to&nbsp;all or&nbsp;part
                                of&nbsp;the Service for any or&nbsp;no&nbsp;reason, including
                                without limitation, any violation of&nbsp;the Terms.
                            </li>
                        </ul>
                        <p>
                            Without limiting the foregoing, we&nbsp;have the right to&nbsp;fully
                            cooperate with any law enforcement authorities or&nbsp;court order
                            requesting or&nbsp;directing&nbsp;us to&nbsp;disclose the identity
                            or&nbsp;other information of&nbsp;anyone posting any materials
                            on&nbsp;or&nbsp;through the Service. You waive and hold harmless the
                            Company and its affiliates, licensees, and service providers from any
                            claims resulting from any action taken by&nbsp;any of&nbsp;the foregoing
                            parties during or&nbsp;as&nbsp;a&nbsp;result of&nbsp;its investigations
                            and from any actions taken as&nbsp;a&nbsp;consequence
                            of&nbsp;investigations by&nbsp;either such parties or&nbsp;law
                            enforcement authorities.
                        </p>
                        <p>
                            However, we&nbsp;do&nbsp;not undertake to&nbsp;review all material
                            before it&nbsp;is&nbsp;posted on&nbsp;the Service, and cannot ensure
                            prompt removal of&nbsp;objectionable material after it&nbsp;has been
                            posted. Accordingly, we&nbsp;assume no&nbsp;liability for any action
                            or&nbsp;inaction regarding transmissions, communications,
                            or&nbsp;content provided by&nbsp;any user or&nbsp;third party.
                            We&nbsp;have no&nbsp;liability or&nbsp;responsibility to&nbsp;anyone for
                            performance or&nbsp;nonperformance of&nbsp;the activities described
                            in&nbsp;this section.
                        </p>
                        <h2 id="section13">Disclaimer of&nbsp;warranties</h2>
                        <p>
                            YOUR USE OF&nbsp;THE SERVICE IS&nbsp;AT&nbsp;YOUR OWN RISK. THE SITE,
                            ITS CONTENT, AND ANY ITEMS OBTAINED THROUGH OPENLAND SERVICES ARE
                            PROVIDED ON&nbsp;AN&nbsp;&ldquo;AS&nbsp;IS&rdquo; AND
                            &ldquo;AS&nbsp;AVAILABLE&rdquo; BASIS, WITHOUT ANY WARRANTIES
                            OF&nbsp;ANY KIND, EITHER EXPRESS OR&nbsp;IMPLIED. NEITHER THE COMPANY
                            NOR ANY PERSON ASSOCIATED WITH THE COMPANY MAKES ANY WARRANTY
                            OR&nbsp;REPRESENTATION WITH RESPECT TO&nbsp;THE COMPLETENESS, SECURITY,
                            RELIABILITY, QUALITY, ACCURACY, OR&nbsp;AVAILABILITY OF&nbsp;THE
                            SERVICES. WITHOUT LIMITING THE FOREGOING, NEITHER THE COMPANY NOR ANYONE
                            ASSOCIATED WITH THE COMPANY REPRESENTS OR&nbsp;WARRANTS THAT THE
                            SERVICES, ITS CONTENT, OR&nbsp;ANY SERVICES OR&nbsp;ITEMS OBTAINED
                            THROUGH THE SERVICES WILL&nbsp;BE ACCURATE, RELIABLE, ERROR-FREE,
                            OR&nbsp;UNINTERRUPTED, THAT DEFECTS WILL&nbsp;BE CORRECTED, THAT THE
                            SERVICES OR&nbsp;THE SERVER THAT MAKES IT&nbsp;AVAILABLE ARE FREE
                            OF&nbsp;VIRUSES OR&nbsp;OTHER HARMFUL COMPONENTS OR&nbsp;THAT THE
                            SERVICES OR&nbsp;ANY SERVICES OR&nbsp;ITEMS OBTAINED THROUGH THE
                            SERVICES WILL&nbsp;OTHERWISE MEET YOUR NEEDS OR&nbsp;EXPECTATIONS.
                        </p>
                        <p>
                            THE COMPANY HEREBY DISCLAIMS ALL&nbsp;WARRANTIES OF&nbsp;ANY KIND,
                            WHETHER EXPRESS OR&nbsp;IMPLIED, STATUTORY, OR&nbsp;OTHERWISE, INCLUDING
                            BUT NOT LIMITED TO&nbsp;ANY WARRANTIES OF&nbsp;MERCHANTABILITY,
                            NON-INFRINGEMENT, AND FITNESS FOR PARTICULAR PURPOSE. THE FOREGOING DOES
                            NOT AFFECT ANY WARRANTIES WHICH CANNOT BE&nbsp;EXCLUDED OR&nbsp;LIMITED
                            UNDER APPLICABLE LAW.
                        </p>
                        <h2 id="section14">Limitation of&nbsp;liability</h2>
                        <p>
                            TO&nbsp;THE MAXIMUM EXTENT PERMITTED BY&nbsp;APPLICABLE LAW, OPENLAND
                            WILL&nbsp;IN NO&nbsp;EVENT BE&nbsp;LIABLE FOR ANY INDIRECT DAMAGES,
                            INCLUDING BUT NOT LIMITED TO&nbsp;LOSS OF&nbsp;DATA OR&nbsp;CONTENT,
                            LOSS OF&nbsp;PROFITS, OR&nbsp;OTHER SPECIAL, INCIDENTAL, CONSEQUENTIAL,
                            EXEMPLARY OR&nbsp;RELIANCE DAMAGES ARISING FROM OR&nbsp;IN&nbsp;RELATION
                            TO&nbsp;THE TERMS OR&nbsp;THE SERVICES, HOWEVER CAUSED.
                        </p>
                        <p>
                            IN&nbsp;NO&nbsp;EVENT WILL&nbsp;OPENLAND&rsquo;S LIABILITY HEREUNDER
                            EXCEEDS THE AMOUNT OF&nbsp;FEES EFFECTIVELY PAID&nbsp;BY CUSTOMER
                            TO&nbsp;OPENLAND UNDER THE PAID-PLAN CONCERNED FOR THE TWELVE-MONTH
                            PERIOD PRECEDING SUCH CLAIM.
                        </p>
                        <p>
                            IN&nbsp;ADDITION, TO&nbsp;THE MAXIMUM EXTENT PERMITTED
                            BY&nbsp;APPLICABLE LAW, OPENLAND SHALL&nbsp;HAVE NO&nbsp;LIABILITY
                            IN&nbsp;RESPECT OF, ANY AND ALL&nbsp;CLAIMS FOR ANY DIRECT AND INDIRECT
                            DAMAGES, FOR ANY REASON AND ON&nbsp;ANY BASIS, ARISING FROM
                            OR&nbsp;IN&nbsp;RELATION TO&nbsp;THE SERVICES PROVIDED TO&nbsp;THE
                            CUSTOMER IN&nbsp;THE COURSE OF&nbsp;A&nbsp;NON-PAID&nbsp;PLAN
                            OR&nbsp;DURING A&nbsp;TRIAL PERIOD.
                        </p>
                        <h2 id="section15">Indemnification</h2>
                        <p>
                            You agree to&nbsp;indemnify, defend and hold harmless the Company, its
                            officers, directors, employees, agents and third parties, for any
                            losses, costs, liabilities and expenses (including reasonable
                            attorney&rsquo;s fees) relating to&nbsp;or&nbsp;arising out of&nbsp;your
                            use of&nbsp;or&nbsp;inability to&nbsp;use the Site or&nbsp;services,
                            your violation of&nbsp;any terms of&nbsp;this Agreement or&nbsp;your
                            violation of&nbsp;any rights of&nbsp;a&nbsp;third party, or&nbsp;your
                            violation of&nbsp;any applicable laws, rules or&nbsp;regulations. The
                            Company reserves the right, at&nbsp;its own cost, to&nbsp;assume the
                            exclusive defense and control of&nbsp;any matter otherwise subject
                            to&nbsp;indemnification by&nbsp;you, in&nbsp;which event you will fully
                            cooperate with the Company in&nbsp;asserting any available defenses.
                        </p>
                        <h2 id="section16">Severability waiver</h2>
                        <p>
                            If, for whatever reason, any term or&nbsp;condition in&nbsp;these Terms
                            is&nbsp;found unenforceable, all other terms and conditions will remain
                            unaffected and in&nbsp;full force and effect. The failure
                            to&nbsp;enforce any provision of&nbsp;these Terms is&nbsp;not
                            a&nbsp;waiver of&nbsp;our right to&nbsp;do&nbsp;so&nbsp;later, and
                            no&nbsp;waiver shall be&nbsp;effective unless made in&nbsp;writing and
                            signed by&nbsp;an&nbsp;authorized representative of&nbsp;the waiving
                            party.
                        </p>
                        <h2 id="section17">Dispute resolution</h2>
                        <p>
                            Most user concerns can be&nbsp;resolved quickly and to&nbsp;the
                            user&rsquo;s satisfaction by&nbsp;emailing our support team at{' '}
                            <a href="mailto:hello@openland.com">hello@openland.com</a>.
                        </p>
                        <p>
                            In&nbsp;the unlikely event that the Openland&rsquo;s support team
                            is&nbsp;unable to&nbsp;resolve your complaint, all matters relating
                            to&nbsp;the Service and the Terms and any dispute or&nbsp;claim arising
                            therefrom or&nbsp;related thereto (in&nbsp;each case, including
                            non-contractual disputes or&nbsp;claims), shall be&nbsp;governed
                            by&nbsp;and construed in&nbsp;accordance with the internal laws
                            of&nbsp;the State of&nbsp;California without giving effect to&nbsp;any
                            choice or&nbsp;conflict of&nbsp;law provisions or&nbsp;rules.
                        </p>
                        <p>
                            At&nbsp;Company&rsquo;s sole discretion, it&nbsp;may require you
                            to&nbsp;submit any disputes arising from the use of&nbsp;these Terms
                            of&nbsp;Use or&nbsp;the Service, including disputes arising from
                            or&nbsp;concerning their interpretation, violation, invalidity,
                            non-performance, or&nbsp;termination, to&nbsp;final and binding
                            arbitration under the Rules of&nbsp;Arbitration of&nbsp;the American
                            Arbitration Association applying California law.
                        </p>
                        <p>
                            Any legal suit, action, or&nbsp;proceeding arising out&nbsp;of,
                            or&nbsp;related&nbsp;to, the Terms or&nbsp;the Service shall
                            be&nbsp;instituted exclusively in&nbsp;the federal courts of&nbsp;the
                            United States or&nbsp;the courts of&nbsp;the State of&nbsp;California
                            in&nbsp;each case located in&nbsp;the County and City of&nbsp;San
                            Francisco. You waive any and all objections to&nbsp;the exercise
                            of&nbsp;jurisdiction over you by&nbsp;such courts and to&nbsp;venue
                            in&nbsp;such courts.
                        </p>
                        <h2 id="section18">Electronic notices</h2>
                        <p>
                            Visiting the Site or&nbsp;sending emails to&nbsp;the Company constitutes
                            electronic communications. You consent to&nbsp;receive electronic
                            communications and you agree that all agreements, notices, disclosures
                            and other communications that we&nbsp;provide to&nbsp;you
                            electronically, via email and on&nbsp;the Site, satisfy any legal
                            requirement that such communications be&nbsp;in&nbsp;writing.
                        </p>
                        <h2 id="section19">Term and termination</h2>
                        <p>
                            This agreement remains in&nbsp;full force and effect while you use the
                            Service. We&nbsp;may terminate your account at&nbsp;any time and for any
                            reason. If&nbsp;you wish to&nbsp;terminate your account, you may simply
                            stop using the Service, not renew your subscription,
                            or&nbsp;contact&nbsp;us at{' '}
                            <a href="mailto:hello@openland.com">hello@openland.com</a>. All
                            provisions of&nbsp;the Terms shall survive termination by&nbsp;either
                            party, including, without limitation, ownership provisions, warranty
                            disclaimers, indemnity, and limitations of&nbsp;liability.
                        </p>
                        <h2 id="section20">Updates to&nbsp;the Terms of&nbsp;Service</h2>
                        <p>
                            Openland reserves the right to&nbsp;change these Terms from time
                            to&nbsp;time. Any changes to&nbsp;the Terms will become effective
                            on&nbsp;the &ldquo;Effective Date&rdquo; indicated above. If&nbsp;you
                            continue to&nbsp;use the service after those changes took effect, you
                            consent to&nbsp;the new Policy. Openland will always have the latest
                            Terms posted on&nbsp;the Service.
                        </p>
                        <h2 id="section21">Contact&nbsp;us</h2>
                        <p>
                            If&nbsp;you have comments or&nbsp;questions about our Terms
                            of&nbsp;Service, please reach out by&nbsp;email at{' '}
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
