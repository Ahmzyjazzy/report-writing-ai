import { ref } from 'vue'
import { defineStore } from 'pinia'
import config from '../config'

export const useResearchStore = defineStore('research', () => {
    const loading = ref(false)

    const projectTopic = ref('Design and Implementation of Synchronised Bank Account Using Sign-On for Multiple Bank Apps')
    const responseTextAbstract = ref('')
    const responseTextChapterOne = ref('')
    const responseTextLiterature = ref('')

    const baseUrl = config.openAi.baseUrl
    const apiKey = config.openAi.apiKey

    function writeText(textElement, textToWrite, cursorElement, index) {

        textElement.textContent += textToWrite[index];
        index++;

        if (index < textToWrite.length) {
            setTimeout(writeText(textElement, textToWrite, cursorElement, index), 60000);
        } else {
            cursorElement.style.display = "none";
        }
    }

    function fetchAbstract() {
        if (!projectTopic.value) return alert('Enter project topic')

        responseTextAbstract.value = ''
        loading.value = true

        const prompt = `
        Generate a profession abstract for a final year student report on the project topic "${projectTopic.value}"
        The Abstract should be written in markdown format
        ###
        Title: Implementation of Biometric Login for Exam in Tertiary School
        Abstract: In today's digitally-driven educational landscape, the need for secure and efficient examination processes is more critical than ever. This webinar will delve into the realm of biometric technology and its practical implementation for enhancing the authentication and security aspects of examinations in tertiary institutions.
        The session will begin with an exploration of the challenges associated with traditional exam authentication methods, highlighting the vulnerabilities and limitations they pose. We will then transition to a comprehensive examination of biometric login systems, focusing on their role in mitigating issues related to impersonation, cheating, and unauthorized access during examinations.
        ###
        Topic: ${projectTopic.value}
        Abstract: 
        `

        fetchCompletion({
            'model': 'text-davinci-003',
            prompt,
            max_tokens: 700
        }, (data) => {
            responseTextAbstract.value = data.choices[0].text
        })
    }

    function fetchChapterOne() {
        if (!responseTextAbstract.value) return alert('No project topic and abstract provided')

        loading.value = true
        responseTextChapterOne.value = ''

        const prompt = `
        Exapand on the provided abstract "${responseTextAbstract.value}" and geenerate Chapter one for the research topic "${projectTopic.value}".
        Chapter one should for the format provided in the example
        ###
        Chapter One: 
        1.1 Background to the Study: 
        Students are expected to describe in general terms the larger area of the problem being
    investigated. This will serve as the basis of introducing the problem. It will also be a
    way to establish relationship that exists between the problem being investigated and the
    larger area of concern to people and organizations.
        1.2 Statement of the Problem: 
        The study is to provide answers /solutions to identified problem(s). Therefore, students
should be able to state the problem clearly and convincingly, justify/show the necessity to
finding solution to it, as well as the implication of such problem. If possible, such problem
could be linked to given theory or fact.
        1.3 Aim and Objectives of the Study: 
        The aim of the study is seeking to find a solution to the problem or finding relationships
that exist between variables connecting the problem by breaking the problem into its
component parts through exploration or analysis. Two (2) to five (5) specific statements
(objectives) of what the researcher intends to do to achieve the aim should be stated. In
essence, the student begins by stating the broad objective (aim of the study), followed by the
specific objectives.
        1.4 Research Questions: 
        These are guides to the researcher in his quest to provide solutions to the problem being
investigated. Such research questions should be in line with the aim and objectives of the
study. When the research questions are answered, the objectives of the study are achieved.
From the general research questions, minor research questions can be formulated and these 
are specific questions which, may be used eventually as questions for the construction of the
questionnaire or any other study instrument. The major research questions should be raised
using active verbs such as are, is, does etc… This will subsequently reinforce both the
validity and the reliability of the instrument.
        1.5 Research Hypotheses (Optional): 
        Hypotheses are basic assumptions regarding the variables, i.e., the statements of
relationship between or among variables. They are conjectural or tentative statements about
the relationship between the variables to be proved right or wrong. It also serves as guide to
the investigator in his/her quest for data or information for the investigation. Hypotheses
could be derived from the literature reviewed and should be in line with or complement the
research questions to achieve the study objectives.
        1.6 Significance of the Study: 
        This section provides justification for the study and what will be contributed to
knowledge by the study if successfully carried out. It provides the author with the
opportunity to justify his/her attempt to solve the problem.
        1.7 Scope of the Study: 
        Delimitation or scope of the study enables the researcher to circumscribe his research
within a manageable limit. It provides the researcher with the opportunity to explain the
boundaries of the study and describe the aspect of a general /wide problem area covered as
well as what aspects will not be covered. The student should state the relevance of the scope
(e.g. time scope) to the study.
        1.8 Definition of Terms: 
        The definition of unfamiliar terms (as used in the study) will be necessary when technical
terms are used or when concepts are used in a specific way in the study. This serves as the
dictionary of the report; hence, the terms are arranged alphabetically
        ###
        Topic: ${projectTopic.value}
        Chapter One: 
        1.1 Background to the Study: 
        1.2 Statement of the Problem: 
        1.3 Aim and Objectives of the Study: 
        1.4 Research Questions: 
        1.5 Research Hypotheses (Optional): 
        1.6 Significance of the Study: 
        1.7 Scope of the Study: 
        1.8 Definition of Terms: 
        `

        fetch(`${baseUrl}/completions`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    'model': 'text-davinci-003',
                    prompt,
                    max_tokens: 1500
                })
            })
            .then(response => response.json())
            .then((data) => {
                responseTextChapterOne.value = data.choices[0].text;
            }).finally(() => {
                loading.value = false
            })
    }

    function fetchLiteratureReview() {
        if (!responseTextChapterOne.value) return alert('No chapter one provided')

        loading.value = true
        responseTextLiterature.value = ''

        const prompt = `
        Exapand on the provided abstract "${responseTextAbstract.value}" and geenerate Chapter one for the research topic "${projectTopic.value}".
        Chapter one should for the format provided in the example
        ###
        Chapter One: 
        2.1 Preamble: 
        This requires a brief outline of the works in this chapter.
        2.2 Theoretical/Conceptual Review: 
        Relevant theories and concepts relating to the problem being investigated in the study
should be briefly discussed and linked to the study to provide the right framework for the study,
i.e., theories on which the study is anchored. It also, provides an avenue to review relevant and
known literature to the problem being investigated. In some fields of study, theoretical and
conceptual reviews can be done separately whereas in others the reviews could be only
conceptual or theoretical.
        2.3 Empirical Review: 
       This gives the researcher the opportunity to review some of the previous works by other
authors in this area of concern. A brief historical review will enable the researcher to follow the
trend of thought in this area. This will enable or help the researcher situate or relate his/her study
to previous works done in the area of concern.
        2.4 Summary of the Literature Review: 
        In this section, the review of the literature done is being summarized. This is expected to
reveal the gap in the literature at a glance.
        ###
        Topic: ${projectTopic.value}
        Literature Review: 
        2.1 Preamble: 
        2.2 Theoretical/Conceptual Review: 
        2.3 Empirical Review:
        2.4 Summary of the Literature Review:
        `

        fetch(`${baseUrl}/completions`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    'model': 'text-davinci-003',
                    prompt,
                    max_tokens: 800
                })
            })
            .then(response => response.json())
            .then((data) => {
                responseTextLiterature.value = data.choices[0].text;
            }).finally(() => {
                loading.value = false
            })
    }

    function fetchCompletion(postObject, cb) {
        fetch(`${baseUrl}/completions`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify(postObject)
            })
            .then(response => response.json())
            .then((data) => {
                cb(data)
            }).finally(() => {
                loading.value = false
            })
    }

    return {
        loading,
        //properties
        projectTopic,
        responseTextAbstract,
        responseTextChapterOne,
        responseTextLiterature,
        //methods
        fetchAbstract,
        fetchChapterOne,
        fetchLiteratureReview,
        writeText
    }
})
