// Import React
import React from 'react'
// Import Spectacle Core tags
import { Deck, Heading, Image, Slide, Text } from 'spectacle'
// Import theme
import createTheme from 'spectacle/lib/themes/default'

// Require CSS
require('normalize.css')

const theme = createTheme(
  {
    primary: 'white',
    secondary: '#1F2022',
    tertiary: '#03A9FC',
    quarternary: '#CECECE',
  },
  {
    primary: 'Black Han Sans',
    secondary: 'Helvetica',
  }
)

export default class Presentation extends React.Component {
  render() {
    return (
      <Deck
        transition={['zoom', 'slide']}
        transitionDuration={500}
        theme={theme}
      >
        <Slide transition={['fade']} bgColor="tertiary">
          <Heading textColor="secondary">Write tests.</Heading>
          <Heading textColor="secondary">Not too many.</Heading>
          <Heading textColor="secondary">Mostly integration.</Heading>
          <Heading lineHeight={2} textColor="primary">
            Use Jest.
          </Heading>
        </Slide>
        <Slide
          transition={['fade']}
          bgColor="primary"
          notes="I work for 24eStore. Published my first JS Open Source package back in 15 Feb 2010 on MooTools Forge. npm was barely a month old and nobody thought it would take over all things JS. Since then contributed to projects like Jest, React, Yarn etc."
        >
          <Heading textColor="secondary">I&quot;m @stipsan</Heading>
          <Text margin="10px 0 0" textColor="tertiary" size={1} bold>
            on GitHub/Twitter/Medium/etc
          </Text>
        </Slide>
        <Slide
          transition={['fade']}
          bgColor="secondary"
          textColor="primary"
          notes={`
          <p>Eat food. Not too much. Mostly plants. – Michael Pollan</p>
          <p>People get too caught up in defining unit vs integration tests</p>
          <p>integration !== e2e/webdriver/selenium</p>
          <p>Pyramids, the metaphor makes it seem like the best strategy is to start with unit tests and work your way up.</p>
          <p>First unit test, then cover missing with integration, then e2e.</p>
          <p>In the twitter thread spawned by the tweet Guillermo elaborates what he means by "integration test", integration tests public APIs. Unit knows about implementation details. </p>
          <p>You can write a shallow rendered test witout knowing about implementation details, wether you call it a unit test or integration test does not really matter anymore does it?</p>
          `}
        >
          <Image src={require('../assets/tweet.png')} display="inline-block" />
        </Slide>
        <Slide
          transition={['fade']}
          bgColor="primary"
          notes={`
          <p>
            Instead of thinking about tests, and what the ratio should be for test coverage, or unit vs integration vs e2e all that stuff…
          </p>
          <p>Tests are not just about verifying that something works, it's also about detecting when something breaks, or when there's potential to break (missing test coverage)</p>
          <p>Just like how the autopilot in self-driving cars can't settle with knowing how to drive and follow signage, but must also be prepared to deal with unexpected obstacles or threats.</p>
        `}
        >
          <Heading size={1} fit caps lineHeight={1} textColor="secondary">
            What matters then?
          </Heading>
        </Slide>
        <Slide
          transition={['fade']}
          bgColor="secondary"
          textColor="primary"
          notes={`
          <p>The Testing Autopilot</p>
          <p>If your testing setup where a car, would you be confident enough to let it drive you?</p>
          <p>And it needs to be able to help you get rid of tech debt, instead of making it harder to improve internal logic.</p>
          <p>Mention eslint, pretter, static typing</p>
          <p>Transition to what role Jest is playing.</p>
          `}
        >
          <Image src={require('../assets/tesla.png')} />
        </Slide>
        <Slide
          transition={['fade']}
          bgColor="primary"
          notes={`
        <p>Introduce the codebase</p>
        <p>Point out how the multi-project feature is used to run tests with different configurations.</p>
          <p>edit "Hello World" text to "Hello ReactJS Oslo"</p>
          `}
        >
          <Heading size={1} fit caps lineHeight={1} textColor="secondary">
            Shallow Render and Snapshots
          </Heading>
          <Text margin="10px 0 0" textColor="tertiary" size={1} fit bold>
            Decisions decisions… – Unknown Google Engineer
          </Text>
          <Image src={require('../assets/truck.gif')} display="inline-block" />
        </Slide>
        <Slide
          transition={['fade']}
          bgColor="primary"
          notes={`
       <p>replace Hello World with component, show how shallow rendering does not pick up on a breaking change (delete defaultProps entity on <Hello /), but that it shows up in the snapshot diff</p>
       yarn dev can show how subtle it is
       uncomment in setupFiles to demo the prop-types thing
       show how prop-type validation can prevent tests from passing accidentally, and that flowtype or typescript can do the same thing
          `}
        >
          <Heading size={1} fit caps lineHeight={1} textColor="secondary">
            2 unit tests, 0 integration tests
          </Heading>
          <Text margin="10px 0 0" textColor="tertiary" size={1} fit bold>
            And how 1 integration test is enough-
          </Text>
          <Image src={require('../assets/tenor.gif')} display="inline-block" />
        </Slide>
        <Slide
          transition={['fade']}
          bgColor="primary"
          notes={`
          <p>start jest with --projects examples/03{a,b} --watch</p>
       <p>Edit footer component to use a different name for the string prop.</p>
       <p>Compare the snapshot output in enzyme with jest</p>
       <p>Explain that TypeScript and FlowType is really good at solving exactly this kind of thing.</p>
       <p>Show the prop-type fix, uncomment the jest-config setupFiles line in 03b.</p>
       <p>restart tests with --projects examples/03* --watch</p>
          `}
        >
          <Heading size={1} fit caps lineHeight={1} textColor="secondary">
            Props + new Date() + Snapshots = mess
          </Heading>
          <Text margin="10px 0 0" textColor="tertiary" size={1} fit bold>
            And Enzyme can snapshot too!
          </Text>
          <Image src={require('../assets/uhoh.gif')} display="inline-block" />
        </Slide>
        <Slide
          transition={['fade']}
          bgColor="primary"
          notes={`
          <p>Different props, show component.update and simply passing different props and snapping the output</p>
<p>start with --projects examples/04a and show the snapshot file, compare the two modes</p>
          `}
        >
          <Heading size={1} fit caps lineHeight={1} textColor="secondary">
            The circle of lifecycles
          </Heading>
          <Text margin="10px 0 0" textColor="tertiary" size={1} fit bold>
            +1 styled components cameo!
          </Text>
        </Slide>
        <Slide
          transition={['fade']}
          bgColor="primary"
          notes={`
          <p>code coverage here can help prevent accidents</p>
          <p>make a typo on state.isOpen to simulate this</p>
          <p>What about user interactions? </p>
          Showcase Kent’s library and how the test code is kept as simple as possible, highlight finding elements by id, show how the other two tests fail if swapping the button with an a element, and how the testing library is unaffected by it
          `}
        >
          <Heading size={1} fit caps lineHeight={1} textColor="secondary">
            Finding the perfect balance
          </Heading>
          <Text margin="10px 0 0" textColor="tertiary" size={1} fit bold>
            3 interesting perspectives, one of them brand new
          </Text>
        </Slide>
      </Deck>
    )
  }
}
