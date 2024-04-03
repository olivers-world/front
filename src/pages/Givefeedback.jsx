import React from "react";

class Rating extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: 0 };

    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    return (
      <>
        <div className="h-[110px]"></div>
        <section className="py-16">
          <div className="mx-auto max-w-lg">
            <div className="flex flex-col items-center">
              <h1 className="font-bold text-xl mb-4">Donnez nous votre avis</h1>
              <h2 className="mb-2">
                Quelle note donneriez vous à votre expérience chez &nbsp;
                <span className="font-imperialScript text-xl">
                  Oliver's World ?
                </span>
              </h2>
              <Rating {...this.props} initialRating={this.state.value} />
              {this.state.value}
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default Rating;
