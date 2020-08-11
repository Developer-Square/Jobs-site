import React from "react";
import { Page, Text, Image, Document, StyleSheet } from "@react-pdf/renderer";
import LogoImage from "image/thedb.png";

function TermsOfUse() {
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
    <Page style={styles.body}>
      <Text style={styles.header} fixed>
        ~ thedatabase.co.ke ~
      </Text>
      <Text style={styles.title}>
        The Database and the Sustainable Development Goals
      </Text>
      <Text style={styles.author}>The DataBase</Text>
      <Text style={styles.text}>
        The Coronavirus has left no aspect of human life untouched, from the
        clearly visible such as the way we work, study, play and even worship to
        the less visible such as domestic violence, unemployment and even the
        realization of the SDGs. Just as we have had to restructure our
        businesses, places of worship, schools, etc., we also have to
        re-evaluate our approach in addressing complex resilient societal issues
        such as those posed by the UN Sustainable Development Goals. As such, we
        as The Database Kenya sat down to assess how best we can contribute to
        the social and economic betterment of the world starting here at home in
        Kenya. We are a business that is not only designed to help in the
        fruition of the SDGs but to do so in a Post-COVID19 world. In light of
        the above, we saw that the following are the SDGs we are best-equipped
        as a young organization to handle:
      </Text>
      <Image style={styles.image} src={LogoImage} />
      <Text style={styles.subtitle}>
        SDG 1- End Poverty in All its Forms Everywhere
      </Text>
      <Text style={styles.text}>
        According to the United Nations, as of 2019, the world was already
        off-track to end poverty by 2030. This situation was further aggravated
        by the unforeseeable pandemic which has caused the first increase in
        global poverty in decades. Over 70 million people all across the globe
        have been pushed into extreme poverty as a direct or indirect result of
        the pandemic. It should also be understood that this poverty
        disproportionately affects the population; hitting vulnerable groups
        harder. Inequalities experienced by the youth, women and children have
        been worsened with young workers being twice as likely to be living in
        extreme poverty as adult workers.
      </Text>
      <Text style={styles.text}>
        Numbers as terrifying as those cited above are the motivation behind the
        creation of The Database because unemployment and poverty are
        inseparably tied together. We are youthcentred and youth-led, the best
        positioned organization to understand the complexities of youth
        unemployment and to provide effective solutions to it.
      </Text>
      <Text style={styles.text}>
        Aside from the other forms of work offered on the platform, we primarily
        focus on The Gig Economy as a plausible answer to youth unemployment. It
        was already projected to be worth Kshs. 34 billion by 2023, employing
        over 100,000 Kenyans. However, the economic implications of COVID19 have
        only further necessitated this form of work with employers being forced
        to downsize or revise salaries downwards just to stay afloat. Workers on
        the other hand need to work more flexible hours in order to work more
        than one job just to make ends meet. The Gig Economy is the perfect
        in-between for employers and workers, offering the former an alternative
        to downsizing and the latter the opportunity to work and earn more and
        us as The Database Kenya are at the centre of it all.
      </Text>

      <Text style={styles.subtitle} break>
        SDG 8- Decent Work and Economic Growth
      </Text>
      <Image style={styles.image} src={LogoImage} />
      <Text style={styles.text}>
        One of the most reliable indicators of global economic performance is
        GDP and what it demonstrated even before COVID19 was that the global
        economy was already slowing down. According to the UN, the world
        reported an averave of 2.0% GDP per capita annually in the years between
        2010 and 2018. In 2019, this reduced by 0.5 percentage points to 1.5%.
        Remember that this is before the onset of the pandemic, when that is
        factored in, conservative estimates expect the world economy to decline
        by 4.2% as the world faces the worst economic recession since The Great
        Depression.
      </Text>
      <Text style={styles.text}>
        These numbers are made a reality when we add the human element. The
        impact of this slowdown is that over 1.6 billion workers in the informal
        sector risk losing their livelihoods during the pandemic. This is only
        worse for Kenya as close to 80% of its labour force is in the informal
        economy. It is estimated that 400 million people lost their jobs in just
        the second quarter of 2020. In fact, in Kenya, it is estimated that
        about 1 million people have already lost their jobs with larger
        proportion falling into underemployment.
      </Text>
      <Text style={styles.text}>
        Mr Guy Rider, the International Labour Organization (ILO)
        Director-General already outlined the importance of involving all the
        relevant stakeholders in the employment sector in finding a lasting
        solution to the effects of COVID19. That is exactly what we aspire to do
        by engaging not only employers and job seekers but even institutions of
        higher learning, the Government of Kenya, religious institutions and
        even non-governmental organizations in finding an effective solution to
        youth unemployment.
      </Text>
      <Text
        style={styles.pageNumber}
        render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
        fixed
      />
    </Page>
  </Document>
);
export default TermsOfUse;
