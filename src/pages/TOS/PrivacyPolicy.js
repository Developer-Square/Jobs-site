import React from "react";
import { Page, Text, Image, Document, StyleSheet } from "@react-pdf/renderer";
import LogoImage from "image/thedb.png";

function PrivacyPolicy() {
  return <Policy />;
}

const styles = StyleSheet.create({
  body: {
    marginTop: "100px",
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
    display: "grid",
    background: "#fff",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    fontFamily: "Oswald",
  },
  author: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
    fontFamily: "Oswald",
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Times-Roman",
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});

const Policy = () => (
  <Document>
    <Page size="A4" style={styles.body}>
      <Text style={styles.header} fixed>
        ~ thedatabase.co.ke ~
      </Text>
      <Text style={styles.title}>The Database Terms of Use</Text>
      <Text style={styles.author}>Revised: Never</Text>
      <Image style={styles.image} src={LogoImage} />
      <Text style={styles.subtitle}>1. Introduction</Text>
      <Text style={styles.text}>
        The Database Kenya Ltd. (“The Database”) is your ultimate career
        destination for exciting job opportunities, expert advice, a peek behind
        the scenes into fantastic employers, and access to amazing career
        coaches.
      </Text>
      <Text style={styles.text}>
        By creating an account or otherwise using the Services (as defined
        below) in any manner, you are entering into a legally binding agreement
        with The Database, a Nairobi corporation headquartered in Ongata Rongai,
        Kajiado North as set forth in these Terms of Use (“Terms”). These Terms
        also include our Privacy Policy which is incorporated by reference
      </Text>
      <Text style={styles.text}>
        You must be at least 16 years of age to use the Services. If you are
        under 16 years of age, you may not, under any circumstances or for any
        reason, use the Services. The Services are not targeted to or meant for
        anyone who has not reached 16 years of age and we will not knowingly
        collect information from anyone under the age of 16. If the applicable
        law in the country or state in which you are using the Services requires
        that you be older than 16 to use the Services, then you must be at least
        the minimum age legally defined for such country or state in order to
        use the Services.
      </Text>

      <Text style={styles.subtitle} break>
        2. Services
      </Text>
      <Image style={styles.image} src={LogoImage} />
      <Text style={styles.text}>
        The “Services” collectively include the “Website” (meaning
        thedatabase.co.ke and including all webpages, subdomains, and any
        successor or affiliated websites), emails, newsletters, and other
        communications, user accounts, job application services, Content, any
        other products or services offered by The Database, and any other
        services that state they are governed by these Terms. “Content” means
        any and all text, articles, images, videos, graphics, software, music,
        audio, information, or other materials appearing on the Website,
        including, without limitation, information about employers, career
        resources, advice, questions, answers, or other content, whether created
        or posted by you, The Database, a third party, or any other user.
      </Text>

      <Text style={styles.subtitle}>3. Modifications</Text>
      <Image style={styles.image} src={LogoImage} />
      <Text style={styles.text}>
        We may update these Terms from time to time. We will give you notice of
        the changes by posting an updated version of these Terms online,
        updating the “Revised” date above, or by emailing you at an email
        address you have provided. Changes to these Terms will be effective as
        of the date we post them or otherwise notify you of them, unless we
        specify a different effective date when we make a particular change.
        Your continued use of the Services will constitute your acceptance of
        the changes. If you do not agree to a change, you must stop using the
        Services
      </Text>
      <Text style={styles.text}>
        We may modify, add to, suspend, or discontinue the Services or certain
        features of the Services, or remove any Content at any time for any
        reason, without prior notice to you. Unless expressly stated otherwise,
        any new feature that augments, enhances, or otherwise modifies the
        Services is subject to these Terms.
      </Text>

      <Text style={styles.subtitle}>$. Accounts</Text>
      <Image style={styles.image} src={LogoImage} />
      <Text style={styles.text}>
        While you are not required to provide your personal information to us,
        unless you create an account with us (a “DB Account”) and give us
        certain personal information, we may not be able to provide you with
        access to, or use of, some of the Services. If you choose not to create
        or continue to maintain a DB Account, you may still access certain
        features as a visitor to our Website. Your access and use of the
        Services, whether as a visitor or as a DB Account holder, is subject to
        these Terms.
      </Text>
      <Text style={styles.text}>
        Your DB Account is for your personal, non-commercial use only and you
        must provide complete and accurate information when creating a DB
        Account. You are responsible for maintaining the confidentiality and
        security of your account information, including any usernames or
        passwords, and are solely responsible for the activity that occurs on
        your DB account. You may not create an account for someone else or allow
        someone else to use your DB account. You agree to notify us immediately
        of any actual or suspected unauthorized access to or use of your
        username or password or any breach of security related to your DB
        account. If your DB account has been cancelled by us, or you have been
        removed or otherwise blocked from the Website due to a violation of our
        Code of Conduct or for any other reason, you may not continue to use the
        Services.
      </Text>
      <Text style={styles.text}>
        You may cancel your DB account at any time by sending an email to{" "}
        <a href="mailto:help@thedatabase.co.ke">customer care</a>. If your DB
        account is cancelled, we have no obligation to maintain, delete or
        return to you any Content or personal information data you have posted
        through your use of the Services unless you specifically request such
        deletion in accordance with our Privacy Policy and have a legitimate
        right to such deletion under applicable law.
      </Text>
      <Text style={styles.subtitle}>5. Job Applications</Text>
      <Image style={styles.image} src={LogoImage} />
      <Text style={styles.text}>
        The Database allows you to get an inside look at employers, browse open
        positions, and apply to jobs. Some job postings on our Website allow
        users who are logged into their DB accounts to complete and submit job
        applications directly through our Website. Additionally, we may, but are
        not obligated to, provide your DB account with the option to save
        information for applying to jobs, such as a favourites list of
        employers, job openings to apply to later, and uploading a resume, cover
        letter, or other professional information. The collection of any such
        information is governed by our Privacy Policy
      </Text>
      <Text style={styles.subtitle}>6. Paid Services</Text>
      <Image style={styles.image} src={LogoImage} />
      <Text style={styles.text}>
        The Services include a variety of products and services that are free to
        use (“Free Services”), as well as certain products and services that
        require payment (“Paid Services”). We reserve the right to charge for
        Free Services or change the price for Paid Services, at any time. If you
        purchase any of our Paid Services, you agree to pay us any applicable
        fees and taxes and you agree to any additional terms that may apply. You
        hereby authorize the collection of such amounts either directly by The
        Database or indirectly via a third-party payment processor. Failure to
        pay these fees will result in the termination of the applicable Paid
        Service. If you are directed to a third-party payment processor, you may
        be subject to terms and conditions governing the use of that
        third-party’s service and that third-party’s personal information
        collection practices
      </Text>
      <Text style={styles.text}>
        Please note that The Database is not liable for any bank fees, foreign
        exchange fees, or differences in prices based on geographic location.
        The Database or its third-party payment processor may store and continue
        billing your payment method in order to charge you for other Paid
        Services you may buy.
      </Text>
      <Text style={styles.subtitle}>7. Content; Licenses</Text>
      <Image style={styles.image} src={LogoImage} />
      <Text style={styles.text}>
        <strong>a. Your Content.</strong> We do not acquire ownership of the
        Content you post through the Services, but by posting any Content, you
        agree to grant us a universal, perpetual, sub-licensable, commercial,
        royalty-free, and irrevocable license to use, copy, reproduce, process,
        adapt, modify, create derivative works from, publish, transmit, display,
        and distribute such Content, in all media and distribution methods now
        known or hereafter devised, and you represent to us that you have the
        right to grant such a license. You agree that this license includes the
        right for other users of the Services to modify your Content and for The
        Database to make your Content available to others for the publication,
        distribution, syndication, or broadcast on other media and services.
        Such additional uses by The Database or others may be made with no
        compensation paid to you with respect to the Content that you submit,
        post, transmit, or otherwise make available through the Services. Any
        feedback, comments, or suggestions you may provide regarding the
        Services is entirely voluntary and we are free to use such feedback,
        comments, or suggestions as we see fit and without any obligation to
        you. We reserve the right, but do not have any obligation to, remove or
        block any Content in our sole discretion, at any time, without notice to
        you and for any reason (including, without limitation, upon receipt of
        claims or allegations from third-parties or authorities relating to such
        Content or if we are concerned that you may have violated these Terms),
        or for no reason at all. If the Content you submit to the Services
        contains your personal information, your right to access that personal
        information is governed by our Privacy Policy
      </Text>
      <Text style={styles.text}>
        <strong>b. The Database Content.</strong> The Website and Services also
        contain Content posted by The Database. We retain all right, title and
        interest in and to such Database Content, including all associated
        intellectual property rights, including, without limitation, copyrights,
        trademarks, trade names, trade dress, logos, patents, know-how, trade
        secrets, instructions, and all other proprietary information. Subject to
        your compliance with these Terms, The Database grants you a revocable,
        limited, non-exclusive, non-transferable license, to access and view any
        Database Content solely for your personal and noncommercial purposes.
        You agree not to sublicense, copy, distribute, display, disseminate,
        reproduce, or otherwise exploit any Database Content or Services without
        our prior written permission, regardless of whether it is created or
        owned by The Database or a licensor to The Database
      </Text>
      <Text style={styles.text}>
        <strong>c. Trademarks. </strong>The trademarks, logos, trade names, and
        service marks, whether registered or unregistered (“Trademarks”)
        displayed on the Website are Trademarks of The Database and its
        third-party licensors. Display or use of any Trademarks on the Website
        or in the Services shall not be construed as granting, by implication or
        otherwise, any license or right to use any Trademark without the prior
        written permission of The Database or such thirdparty. You also agree
        not to use our trade dress, or copy the look and feel of the Website or
        its design.
      </Text>
      <Text style={styles.text}>
        <strong>d. Disclosure of Content.</strong> We reserve the right to
        access, read, preserve, and disclose any Content or information in
        accordance with our Privacy Policy.
      </Text>
      <Text style={styles.subtitle}>8. Links to Third-Party Sites</Text>
      <Image style={styles.image} src={LogoImage} />
      <Text style={styles.text}>
        The Website may direct you to third-party websites that are not owned or
        maintained by The Database. We are not responsible for your use of such
        third-party websites and we make no representations whatsoever
        concerning the content or accuracy of, opinions expressed in, or other
        links provided by such websites. The inclusion of any such link to a
        third-party website does not imply any association between us and their
        operators. Your use of any third-party websites is governed by the terms
        of such thirdparty websites and not by these Terms.
      </Text>
      <Text style={styles.subtitle}>9. Code of Conduct</Text>
      <Image style={styles.image} src={LogoImage} />
      <Text style={styles.text}>
        You understand and agree that you are solely responsible for compliance
        with any and all laws, rules, regulations, and tax obligations that may
        apply to your use of the Services. In connection with your use of the
        Services, you agree that you will not:
      </Text>
      <section style={{ left: "10px" }}>
        <Text style={styles.text}>
          <strong>o </strong> Violate any local, national, regional,
          international, or other law or regulation, or any order of a court.
        </Text>

        <Text style={styles.text}>
          <strong>o </strong> Run any bots, spiders, scrapers, web crawlers,
          indexing agents, or other software to aggregate or browse our
          Services, including, without limitation, company or user accounts or
          profiles, or otherwise interfere with or circumvent the integrity of
          the Website or Services.
        </Text>
        <Text style={styles.text}>
          <strong>o </strong> Introduce any viruses, trojan horses, worms, time
          bombs, cancelbots, corrupted files, or similar software to the Website
          or Services or transmit any other computer programming routines that
          may damage, interfere with, or surreptitiously intercept any data, or
          personal information.
        </Text>
        <Text style={styles.text}>
          <strong>o </strong> Use the Services to transmit, distribute, post, or
          submit any confidential information concerning any other person or
          entity.
        </Text>
        <Text style={styles.text}>
          <strong>o </strong> Stalk or harass, interfere with, or disrupt the
          access of any user of the Services, or collect or store any personally
          identifiable information about any other user without explicit consent
          from the user.
        </Text>
        <Text style={styles.text}>
          <strong>o </strong> Defame, defraud, mislead, or impersonate any
          person or entity, or otherwise misrepresent yourself or your
          affiliation with any person or entity.
        </Text>
        <Text style={styles.text}>
          <strong>o </strong> Post false information, including, without
          limitation, in respect of a job, company, or your own credentials as a
          job applicant.
        </Text>
        <Text style={styles.text}>
          <strong>o </strong> Infringe, violate, or otherwise interfere with any
          copyright, trademark, or other intellectual property rights of another
          party.
        </Text>
        <Text style={styles.text}>
          <strong>o </strong> Act in any manner which, in our sole discretion,
          is objectionable, interferes with the proper working of the Services,
          or which may affect our reputation in any way.
        </Text>
      </section>

      <Text style={styles.subtitle}>10. Disclaimers</Text>
      <Image style={styles.image} src={LogoImage} />
      <Text style={styles.text}>
        The disclaimers in this section apply to the maximum extent allowable
        under applicable law.
      </Text>
      <Text style={styles.text}>
        You are solely responsible for your use of the Services and we are not
        responsible for the activities, omissions, or other conduct, whether
        online or offline, of any other user or any Coach. You are solely
        responsible for ensuring that your use of the Services is in compliance
        with all laws, rules, and regulations applicable to you. We make no
        representations concerning any Content contained in or accessed through
        the Services.
      </Text>
      <Text style={styles.text}>
        The Services are provided “as is” and without warranty of any kind,
        whether express or implied, including the warranties or conditions of
        merchantability, fitness for a particular purpose, accuracy, or
        non-infringement, all of which are expressly disclaimed. The Database
        does not warrant that: (a) the Services will be secure or available at
        any particular time or location; (b) the Services will function without
        errors; (c) any defects or errors will be corrected; (d) any Content or
        software available through the Services is free of viruses or other
        harmful components; and (e) the results of using or relying on any
        Content or Services or advice contained therein will meet your
        requirements or produce desired results. Your use of, or reliance on,
        the Services or any Content is solely at your own risk.
      </Text>
      <Text style={styles.subtitle}>11. Limitation of Liability</Text>
      <Image style={styles.image} src={LogoImage} />
      <Text style={styles.text}>
        TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL THE
        DATABASE BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY LOST PROFITS OR ANY
        INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE
        DAMAGES, OR ANY LOSS OF DATA, OPPORTUNITIES, OR REPUTATION ARISING FROM
        YOUR USE OF THE WEBSITE, CONTENT, OR SERVICES, EVEN IF WE HAVE BEEN
        ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. NOTWITHSTANDING ANYTHING TO
        THE CONTRARY CONTAINED HEREIN, UNLESS OTHERWISE REQUIRED BY APPLICABLE
        LAW, YOU AGREE THAT IN NO EVENT SHALL THE AGGREGATE LIABILITY OF THE
        DATABASE, WHETHER IN CONTRACT, WARRANTY, TORT (INCLUDING NEGLIGENCE,
        WHETHER ACTIVE, PASSIVE, OR IMPUTED), PRODUCT LIABILITY, STRICT
        LIABILITY, OR OTHER THEORY, ARISING OUT OF OR RELATING TO THE USE OF OR
        INABILITY TO USE THE SERVICES EXCEED THE AMOUNT PAID BY YOU, IF ANY, FOR
        ACCESSING THE SERVICES DURING THE TWELVE (12) MONTHS IMMEDIATELY
        PRECEDING THE DATE OF THE CLAIM OR ONE HUNDRED DOLLARS, WHICHEVER IS
        GREATER
      </Text>
      <Text style={styles.subtitle}>
        12. Copyright and Intellectual Property
      </Text>
      <Image style={styles.image} src={LogoImage} />
      <Text style={styles.text}>
        If you believe that your copyright has been infringed on the Website or
        otherwise in our Services, please notify us via mail or email with a
        message which contains:
      </Text>
      <Text style={styles.text}>
        <strong>o </strong> Your name and contact information, including your
        address, telephone number, and an email address;
      </Text>
      <Text style={styles.text}>
        <strong>o </strong> The name of the party whose copyright has been
        allegedly infringed, if different from your name;
      </Text>
      <Text style={styles.text}>
        <strong>o </strong> The name and description of the original work that
        is allegedly being infringed;
      </Text>
      <Text style={styles.text}>
        <strong>o </strong> The location of the alleged infringing copy (such as
        the URL);
      </Text>
      <Text style={styles.text}>
        <strong>o </strong> A statement that you have a good faith belief that
        use of the copyrighted work is not authorized by the copyright owner (or
        by a third-party who is legally entitled to authorize its use on behalf
        of the copyright owner) and is not otherwise permitted by law; and
      </Text>
      <Text style={styles.text}>
        <strong>o </strong> A statement that you swear, under penalty of
        perjury, that the information contained in the notification is accurate
        and that you are the copyright owner or have an exclusive right in law
        to bring infringement proceedings with respect to its use.
      </Text>
      <Text style={styles.text}>
        {" "}
        You must sign this notification and send it to us:
      </Text>
      <Text style={styles.text}>Ongata Rongai, Kajiado County.</Text>
      <Text style={styles.text}>legal@thedatabase.co.ke</Text>
      <Text style={styles.text}>
        We review all infringement claims, determine their merit, and act
        accordingly.
      </Text>
      <Text style={styles.subtitle}>13. Indemnification</Text>
      <Image style={styles.image} src={LogoImage} />
      <Text style={styles.text}>
        You agree to indemnify, defend and hold harmless The Database, its
        affiliates and each of their respective principals, shareholders,
        agents, officers, directors, consultants, and employees from or against
        third-party claims, damages, payments, deficiencies, fines, judgments,
        settlements, liabilities, losses, costs, and expenses arising from or
        relating to any third-party claim, suit, action or proceeding arising
        out of or related to your use or purchase of the Services, your
        violation of the rights of any third-party or person, or your breach of
        these Terms or any representation or warranty contained herein. The
        Database reserves the right, at your expense, to assume the exclusive
        defense and control of any matter for which you are required to
        indemnify The Database, and you agree to cooperate with The Database’s
        defense of these claims. The Database will use reasonable efforts to
        notify you of any such claim, action, or proceeding upon becoming aware
        of it.
      </Text>
      <Text style={styles.subtitle}>14. Dispute Resolution</Text>
      <Image style={styles.image} src={LogoImage} />
      <Text style={styles.text}>
        You agree that the laws of the Republic of Kenya, shall exclusively
        govern any dispute relating to these Terms and/or the Services.
      </Text>
      <Text style={styles.text}>
        PLEASE READ THE FOLLOWING PARAGRAPH CAREFULLY BECAUSE IT REQUIRES YOU TO
        ARBITRATE DISPUTES WITH THE DATABASE AND LIMITS THE MANNER IN WHICH YOU
        CAN SEEK RELIEF FROM THE DATABASE. ARBITRATION PREVENTS YOU FROM SUING
        IN COURT.
      </Text>
      <Text style={styles.text}>
        You and The Database agree to arbitrate any dispute arising from these
        Terms or your purchase or use of the Services, except that you and The
        Database are not required to arbitrate any dispute in which either party
        seeks equitable and other relief for the alleged unlawful use of
        copyrights, trademarks, trade names, logos, trade secrets, or patents.
        You and The Database agree that you will notify each other in writing of
        any dispute within thirty (30) days of when it arises. Notice to The
        Database shall be sent by email to legal@thedatabase.co.ke. You and The
        Database further agree: to attempt informal resolution prior to any
        demand for arbitration; that any arbitration will occur in Nairobi, that
        arbitration will be conducted confidentially by a single arbitrator; and
        that the State or Courts in Kenya have exclusive jurisdiction over any
        appeals of an arbitration award and over any suit between the parties
        not subject to arbitration. Other than class procedures and remedies
        discussed below, the arbitrator has the authority to grant any remedy
        that would otherwise be available in court. Whether the dispute is heard
        in arbitration or in court, you and The Database will not commence
        against the other a class action, class arbitration, or other
        representative action or proceeding.
      </Text>
      <Text style={styles.subtitle}>15. Miscellaneous</Text>
      <Image style={styles.image} src={LogoImage} />
      <Text style={styles.text}>
        These Terms, together with the, and any other legal notices published on
        the Website, shall constitute the entire agreement between you and The
        Database concerning your use of the Services. These Terms, and any
        rights and licenses granted hereunder, may not be transferred or
        assigned by you, but may be assigned by The Database at any time without
        restriction. If any provision of these Terms is deemed invalid by a
        court of competent jurisdiction, the invalidity of such provision shall
        not affect the validity of the remaining provisions of these Terms,
        which shall remain in full force and effect. If two or more provisions
        of this Agreement are deemed to conflict with each other’s operation,
        The Database shall have the sole right to elect which provision remains
        in force. No waiver of any one provision set forth in these Terms shall
        be deemed a further or continuing waiver of such provision or any other
        provision, and The Database’s failure to assert or enforce any right or
        provision under these Terms shall not constitute a waiver of such right
        or provision
      </Text>
      <Text style={styles.text}>
        Any inquiries about your rights under these Terms, or any matters
        regarding your privacy, can be directed to, respectively, or by mail to:
      </Text>
      <Text style={styles.text}>legal@thedatabase.co.ke</Text>

      <Text
        style={styles.pageNumber}
        render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
        fixed
      />
    </Page>
  </Document>
);
export default PrivacyPolicy;
