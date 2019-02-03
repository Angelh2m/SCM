import React from 'react'
import { Link } from 'gatsby'
import './MarkHeader.scss'
import marketingSvg from './marketing-hero.svg'

export default function MarkHeader() {
  return (
    <div>
      <img src={marketingSvg} alt="" />
      <div className="marketing__header container">
        <p className="logo">
          <strong> Doctor </strong> Care <small>MX</small>
        </p>
        <div className="marketing__hero">
          <div className="marketing__hero__text">
            <h2>Unlimited Consultations</h2>
          </div>

          <div className=" marketing__header__box">
            <div className="row">
              <div className="col-6">
                <p className="marketing__header--p">
                  <strong> Save up to 70% </strong> on major surgeries
                </p>
              </div>

              <div className="col-6">
                <div className="comparison__card ">
                  <div className="comparison__title">
                    <h2>Knee Prosthetic Cost</h2>
                  </div>
                  <div className="comparison__chart">
                    <div className="comparison__element">
                      <div className="comparison__flex">
                        <span>USA</span>
                        <span>35K+</span>
                      </div>
                      <div className="comparison__line--p" />
                    </div>
                    <div className="comparison__element comparison__mexico">
                      <div className="comparison__flex">
                        <span>Mexico</span>
                        <span>5K+</span>
                      </div>
                      <div className="comparison__line--p" />
                      <div className="comparison__line--gray" />
                      <div className="comparison__line--travel" />
                    </div>
                  </div>
                  <div className="comparison__legend">
                    <span className="comparison__bullet-green" />
                    <p>Optional Travel</p>
                    <span className="comparison__bullet-purple" />
                    <p>Approximate cost surgery and hospital</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="buttons__action">
          <div className="button button__white">
            <Link to="doctor-consultations-free-trial">Sign Up </Link>
          </div>
          <div className="button button__green"> Free trial </div>
        </div>
      </div>
    </div>
  )
}
