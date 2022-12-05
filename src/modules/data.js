export default class Data {
  constructor() {
    this.content = [
      {
        title: 'Rand Tablet',
        year: "1970's",
        content: `
          <p>Rand tablet</p>
        `,
        extra: null,
      },
      {
        title: '21 Facial Markers',
        year: "1980's",
        content: `
          <p>21 Facial Markers</p>
        `,
        extra: null,
      },
      {
        title: 'Eigenfaces',
        year: "1980's",
        content: `
          <p>Eigenfaces</p>
        `,
        extra: null,
      },
      {
        title: 'Social Media',
        year: "1980's",
        content: `
          <p>Social Media</p>
        `,
        extra: null,
      },
      {
        title: 'Deep Learning',
        year: "1980's",
        content: `
          <p>Deep Learning</p>
        `,
        extra: {
          firstStep: 'Creates a 3D face-mesh',
          secondStep: 'Gets processed by machine learning',
          thirdStep: 'A mathematical representatio of the face is created',
        },
      },
    ]
  }
}
