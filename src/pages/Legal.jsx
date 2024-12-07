import styled, { css } from "styled-components";
import Heading from "../ui/Heading";
import { useState } from "react";
import { devicesMax } from "../styles/breakpoint";

const Container = styled.div`
  padding: 5rem;
  height: 85vh;
  
`;
const Header =  styled.div`
padding: 2rem`


const Main = styled.div`
  display: flex;
  height: 100%;


  @media ${devicesMax.md} {
       flex-direction: column;
      }
`;
const SideUl = styled.ul`
  border: 2px solid var(--color-grey-200);
  border-radius: 5px;
  padding: 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  @media ${devicesMax.md} {
       flex-direction: row;
      }
     

`;
const Detail = styled.div`
  padding: 2rem;
  flex: 5;
  overflow-y: auto;
  
`;

const P = styled.div`
  margin-bottom: 1rem;
`;
const Ul = styled.ul`
  padding: 2rem;
`;
const ActiveLink = styled.li`
  padding: 1rem;
font-size: 2rem;
  @media ${devicesMax.lg} {
    font-size: 1.2rem;
     
      }
  ${(props) =>
    props.toggle === props.active &&
    css`
      text-decoration: underline;
      font-size: 2rem;
      font-weight: 900;
      cursor: pointer;

      @media ${devicesMax.lg} {
    font-size: 1.1rem;
     
      }
    `};
`;
function Legal() {
  const [toggle, setToggle] = useState(1);
  return (
    <Container>
      <Header><Heading as="h1">Legal</Heading></Header>
      
      
      <Main>
        <SideUl>
          <ActiveLink active={1} toggle={toggle} onClick={() => setToggle(1)}>
            User Agreement
          </ActiveLink>
          <ActiveLink active={2} toggle={toggle} onClick={() => setToggle(2)}>
            Privacy Policy
          </ActiveLink>
        </SideUl>
        <Detail>
          {toggle === 1 && (
            <div>
              <Heading as="h2">User Agreement</Heading>
              <Heading as="h3">Welcome to Eazworld</Heading>
              <P>
                Welcome! Thanks for visiting eazworld, an exchanging digital
                asset platform.By registering for a Gemini account, you
                acknowledge that you have read, understood, and agreed to be
                bound by the terms and conditions of this User Agreement between
                you and easyworldpc.
              </P>
              <P>
                Please be aware that signing up for eazworld and opening an
                account constitutes your acceptance of this User Agreement,
                which is a legally binding contract between you and easyworld pc
                enterprise.
              </P>
              <P>
                Before using eazworld, please carefully review this User
                Agreement, as it outlines the terms and conditions that govern
                your relationship with easyworld Pc Enterprise. By accessing or
                using eazworld, you acknowledge your acceptance of these terms
                and conditions.
              </P>
              <P>
                By registering for a eazworld account, you confirm that you are
                at least 18 years old, have the capacity to enter into a binding
                agreement, and accept the terms and conditions of this User
                Agreement in full.
              </P>
              <Heading as="h4">ecurrency</Heading>
              <P>
                Digital currencies such as Bitcoin, Ethereum, Litecoin, Perfect
                Money, Skrill, and others can be transferred independently
                through online platforms and wallets
              </P>
              <Heading as="h4">Orders</Heading>
              <P>
                Orders refer to specific requests made by customers for
                eazworld&apos;s exchange services. Each order includes details
                such as:
              </P>
              <Ul>
                <li>Type of e-currency</li>
                <li>Wallet Address</li>
                <li>Quantity required</li>
                <li>Preferred mode of payment</li>
              </Ul>
              <strong>Order Identification</strong>
              <P>
                Each order placed by customers on the eazworld or website is
                assigned a unique Order Number (Order No). The Order Number is
                used to identify and track individual orders. *Order Number
                Prefixes* Order Numbers are prefixed with the following letters
                to indicate the type of order:
              </P>
              <Ul>
                <li>Buying orders: EW (EW847463) </li>
                <li>Selling orders: EW (EW00987)</li>
                <li>Exchange orders: EW (EW89083)</li>
              </Ul>

              <Heading>Customers</Heading>
              <P>
                As a customer of Eazworld, you are required to adhere to the
                following terms:
              </P>
              <Ul>
                <li>
                  <strong>Registration and Verification:</strong> <br />
                  You must register/sign up and be verified by email and phone
                  number to use our services. All personal information shared
                  with Ecurrency4u is used only for account and verification
                  purposes and is not shared with third parties.
                </li>
                <li>
                  <strong>Account Information:</strong>
                  <br />
                  You must ensure that your email and phone number are updated
                  and active, as these will be used for communication regarding
                  orders and promotional activities.
                </li>
                <li>
                  <strong>Account Security:</strong>
                  <br />
                  You are responsible for the security of your eazworld account.
                  You must keep your account passwords and PINs safe and not
                  share them with any third party, including eazworld.
                </li>
                <li>
                  <strong>Order Accuracy:</strong>
                  <br />
                  You must cross-check and confirm all details in your orders
                  before completing the order process. eazworld will not be
                  liable for errors due to incorrect details.
                </li>
                <li>
                  <strong>Third-Party Transactions:</strong>
                  <br />
                  You must not use eazworld services for third-party
                  transactions. All e-currency exchanges must be made to and
                  from wallets owned by the registered customer.
                </li>
                <li>
                  <strong>Timely Payments:</strong>
                  <br />
                  You must place orders and make payments in a timely manner to
                  avoid price fluctuations. All orders have a shelf life of 72
                  hours
                </li>
                <li>
                  <strong>Miner Fees:</strong>
                  <br />
                  You must pay miner fees when purchasing certain e-currencies,
                  such as Bitcoin.
                </li>
                <li>
                  <strong>Payment Instructions:</strong>
                  <br />
                  You must adhere to payment instructions on the website and
                  reference your payments accurately.
                </li>
                <li>
                  <strong>Customer Conduct:</strong>
                  <br />
                  You must be courteous and cordial to eazworld support staff
                  and systems.
                  <Ul>
                    <li>
                      <strong>Anti-Money Laundering:</strong>
                      <br />
                      You must not use Ecurrency4u services for money laundering
                      activities
                    </li>
                    <li>
                      <strong>Abuse Reporting:</strong>
                      <br />
                      You must report any attempted abuse or hacking of the
                      Ecurrency4u portal or website.
                    </li>
                    <li>
                      <strong>Promotional Activities:</strong>
                      <br />
                      You must participate in all promotional activities of
                      eazworld and enjoy benefits from our loyalty program.
                    </li>
                    <li>
                      <strong>Service Cancellation:</strong>
                      <br />
                      You have the right to decline and unsubscribe from
                      eazworld services at any time.
                    </li>
                  </Ul>
                </li>
              </Ul>
              <Heading>Eazworld commitment</Heading>
              <P>
                Eazworld is committed to providing a world-class e-currency
                exchange service. The following outline our commitment to our
                customers:
              </P>
              <Ul>
                <li>
                  <strong>World-Class Service:</strong>
                  <br /> Provide safe, fast, reliable, and professional
                  e-currency exchange services to all customers.
                </li>
                <li>
                  <strong> Data Protection:</strong>
                  <br /> Use personal information only for verification and
                  customer account management purposes, and not share it with
                  any third party.
                </li>
                <li>
                  <strong>Security:</strong>
                  <br />
                  Run a highly secure service using SSL certification and highly
                  encrypted systems to ensure the security of transactions,
                  orders, and personal details.
                </li>
                <li>
                  <strong>Order Processing:</strong>
                  <br />
                  Process all paid orders within 3-7 minutes of receiving
                  correct details and payment information
                </li>
                <li>
                  <strong>Payment Processing:</strong>
                  <br />
                  Make payments for all selling orders within 7 minutes of
                  receiving the sold e-currency, except for bank payments which
                  may take 30 minutes to 2 hours.
                </li>
                <li>
                  <strong>Accuracy:</strong>
                  <br /> Ensure that all information on the site is true and
                  correct.
                </li>
                <li>
                  <strong>promotions:</strong>
                  <br />
                  promotions can be changed or stopped at any time. Reward that
                  cames to customers who always use our service
                  <br />
                  <strong>The pomotions has four levels:</strong>
                  <br />
                  <Ul>
                    <li>
                      <strong>Rookie:</strong> <br />A registered customer who
                      has not yet reached the Member level.
                    </li>
                    <li>
                      <strong>Member Customer:</strong>
                      <br />A Rookie customer who has bought or sold up to
                      $1,000 of e-currency and left a testimonial. Silver
                      customers receive a 0.05% discount on all e-currency
                      purchases and a 0.05% increase on all e-currencies being
                      sold.
                    </li>
                    <li>
                      <strong>Gold Customer:</strong>
                      <br />A silver customer who has bought up to $10,000 or
                      sold more than $10,000 of e-currencies and left a
                      testimonial. Gold customers receive a 0.075% discount on
                      all e-currency purchases and a 0.075% increase on all
                      e-currencies being sold.
                    </li>
                    <li>
                      <strong>Platinum Custome</strong>
                      <br />A gold customer who has purchased up to $20,000 or
                      sold more than $20,000 of e-currencies and left a
                      testimonial. Platinum customers receive a 1% discount on
                      all e-currency purchases and a 1% increase on all
                      e-currencies being sold.
                    </li>
                  </Ul>
                </li>
              </Ul>
            </div>
          )}
          {toggle === 2 && (
            <div>
              <Heading as="h2">Eazworld Privacy Policy</Heading>
              <Heading as="h5">Introduction</Heading>
              <P>
                At eazworld, we recognize the importance of protecting personal
                information. We are committed to ensuring the privacy and
                confidentiality of personal data, which is a fundamental
                component of our business.
              </P>
              <Heading as="h3">What is Personal Data?</Heading>
              <P>
                Personal Data refers to any information relating to an
                identified or identifiable natural person. This includes, but is
                not limited to:
              </P>
              <ul style={{ listStyleType: "lower-roman", padding: "1rem" }}>
                <li>- Information stored on our servers or network</li>
                <li>
                  -Information intended to be stored on our servers or network
                </li>
              </ul>
              <Heading as="h3">Our Commitment to Privacy</Heading>
              <P>
                We are dedicated to protecting the privacy and confidentiality
                of Personal Data. This Privacy Policy outlines: parties
              </P>
              <ul style={{ listStyleType: "lower-roman", padding: "2rem" }}>
                <li>- The information we gather</li>
                <li>- How we use Personal Data</li>
                <li>
                  - The circumstances under which we disclose Personal Data to
                  third
                </li>
              </ul>
              <Heading as="h3">who we are</Heading>
              <Heading as="h5">Important Information</Heading>
              <P>
                Eazworld is a leading cryptocurrency exchange company in Ghana
                that offers:
              </P>
              <ul style={{ listStyleType: "lower-roman", padding: "2rem" }}>
                <li>Buying services for various electronic currencies</li>
                <li>Selling services for various electronic currencies</li>
                <li>Exchanging services for various electronic currencies</li>
              </ul>
              <P>
                Since our establishment in 2011, we have been committed to
                providing secure and reliable services to our customers. Purpose
                of This Privacy Policy This privacy policy aims to provide you
                with information on:
              </P>
              <ul style={{ listStyleType: "lower-roman", padding: "2rem" }}>
                <li>How eazworld collects your personal data </li>
                <li>How eazworld processes your personal data </li>
                <li>Your rights and options regarding your personal data</li>
              </ul>
              <Heading as="h5">Through your use of our:</Heading>
              <ul style={{ listStyleType: "lower-roman", padding: "2rem" }}>
                <li>Website</li>
                <li>Mobile application</li>
              </ul>
              <Heading as="h3">Collection of Personal Data</Heading>
              <P>
                When you access or use the Services, we collect the following
                information:
              </P>
              <Heading as="h3">Data We Collect About You We</Heading>
              <P>
                may collect, use, store, and transfer different kinds of
                personal data about you, which we have grouped together as
                follows:
              </P>
              <Heading as="h5">Identity Data </Heading>
              <ul>
                <li> Full Name</li>
                <li>Username or similar identifier</li>
              </ul>
              <Heading as="h5">Contact Data </Heading>
              <ul>
                <li>Billing address </li>
                <li>Email address</li>
                <li>Telephone numbers </li>
              </ul>
              <Heading as="h5">Financial Data </Heading>
              <ul>
                <li>Bank account details</li>
                <li>Payment card details</li>
              </ul>
              <Heading as="h5">Transaction data</Heading>
              <ul>
                <li>Details about payments to and from you</li>
                <li>
                  Other details of products and services you have purchased from
                  us
                </li>
              </ul>
              <Heading>Technical Data</Heading>
              <ul>
                <li>⁠Internet protocol (IP) address </li>
                <li>⁠Login data </li>
                <li>⁠Browser type and version </li>
                <li>⁠Time zone setting and location</li>
                <li>⁠Browser plug-in types and versions </li>
                <li>⁠ ⁠Operating system and platform </li>
                <li>
                  ⁠ ⁠Other technology on the devices you use to access this
                  website or our app
                </li>
              </ul>
              <Heading as="h5">Usage Data</Heading>
              <ul>
                <li>
                  ⁠Information about how you use our website, products, and
                  services
                </li>
              </ul>

              <Heading as="h3">how we manage you personal data</Heading>
              <Heading as="h5">
                Lawful Basis for Processing Personal Data
              </Heading>
              <P>
                We will only use your personal data when the law allows us to.
                The following are the most common circumstances under which we
                will use your personal data:
              </P>
              <Heading as="h5">Purposes of Processing Personal Data</Heading>
              <ul>
                <li>
                  <strong>Customer Registration:</strong> To register you as a
                  new customer.
                </li>
                <li>
                  <strong>Order Processing:</strong> To process and deliver your
                  orders.
                </li>
                <li>
                  <strong>Relationship Management:</strong> To manage our
                  relationship with you.
                </li>
                <li>
                  <strong>Marketing and Research:</strong> To enable you to
                  participate in a prize draw, competition, or complete a
                  survey.
                </li>
                <li>
                  <strong>Business Administration:</strong> To administer and
                  protect our business and this website.
                </li>
                <li>
                  <strong>Personalization:</strong> To deliver relevant website
                  content and advertisements to you.
                </li>
                <li>
                  <strong>Analytics:</strong> To use data analytics to improve
                  our website, products/services, marketing, customer
                  relationships, and experiences. 8.Recommendations:
                </li>
                <li>
                  <strong>Recommendations:</strong> To make suggestions and
                  recommendations to you about goods or services that may be of
                  interest to you.
                </li>
              </ul>
              <Heading as="h3">How manage your Personal data</Heading>
              <P>
                ⁠The use of your personal data is subject to applicable laws and
                regulations
              </P>
              <P>
                The following are the primary purposes for which we use your
                personal data:
              </P>
              <ul>
                <li>⁠To register you as a new customer</li>
                <li>To process and deliver your orders</li>
                <li>⁠To manage our relationship with you</li>
                <li>
                  To enable you to participate in a prize draw, competition, or
                  complete a survey
                </li>
                <li>To administer and protect our business and this website</li>
                <li>
                  ⁠To deliver relevant website content and advertisements to you
                </li>
                <li>
                  ⁠To use data analytics to improve our website,
                  products/services, marketing, customer relationships, and
                  experiences
                </li>
                <li>
                  ⁠To make suggestions and recommendations to you about goods or
                  services that may be of interest to you
                </li>
              </ul>
              <Heading as="h5"></Heading>
              <P>
                We take data security seriously and have implemented measures to
                protect your personal data from:
              </P>
              <ul>
                <li>Accidental loss</li>
                <li>Unauthorized use or access</li>
                <li>Alteration</li>
                <li>Disclosure</li>
              </ul>
              <Heading as="h5">Data Retention</Heading>
              <P>
                We will only retain your personal data for as long as necessary
                to fulfill the purposes we collected it for.
              </P>
              <Heading as="h5">Your Legal Rights</Heading>
              <P>
                You have rights under data protection laws in relation to your
                personal data. These rights include:
              </P>
              <Heading as="h5">Third-Party Links</Heading>
              <P>
                This website may include links to third-party websites,
                plug-ins, and applications. We do not control these third-party
                websites and are not responsible for their privacy statements.
              </P>
              <Heading as="h5">Contact</Heading>
              <P>
                If you have any questions about this privacy policy or our
                privacy practices, please contact us.
              </P>

              <P>
                We encourage you to periodically review this policy for any
                updates or changes.
              </P>
            </div>
          )}
        </Detail>
      </Main>
    </Container>
  );
}

export default Legal;
