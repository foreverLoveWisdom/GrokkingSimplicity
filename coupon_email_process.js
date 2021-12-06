var subscriber = {
  email: "sm@pmail.com",
  rec_count: 16,
};

var rank1 = "best";
var rank2 = "good";

function subCouponRank(subscriber) {
  if (subscriber.rec_count >= 10) {
    return "best";
  } else {
    return "good";
  }
}

var coupon = {
  code: "10PERCENT",
  rank: "bad",
};

function selectCouponsByRank(coupons, rank) {
  var ret = [];

  for (let c = 0; c < coupons.length; c++) {
    var coupon = coupons[c];

    if (coupon.rank === rank) {
      ret.push(coupon.code);
    }
    return ret;
  }
}

var message = {
  from: "newsletter@coupondog.co",
  to: "sam@pmail.com",
  subject: "Your weekly cupons inside",
  body: "Here are your coupons...",
};

function emailForSubscriber(subscriber, goods, bests) {
  var rank = subCouponRank(subscriber);

  if (rank === "best") {
    return {
      from: "newsletter@coupondog.co",
      to: subscriber.eamil,
      subject: "Your best weekly coupons inside",
      body: "Here are the best coupons: " + bests.join(", "),
    };
  } else {
    // rank === "good"
    return {
      from: "newsletter@coupondog.co",
      to: subscriber.email,
      subject: "Your good weely coupons inside",
      body: "Here are the good coupons: " + goods.join(", "),
    };
  }
}

function emailsForSubscribers(subscribers, goods, bests) {
  var emails = [];

  for (let s = 0; s < subscribers.length; s++) {
    var subscriber = subscribers[s];
    var email = emailForSubscriber(subscriber, goods, bests);

    emails.push(email);
  }

  return emails;
}

function sendIssue() {
  var coupons = fetchCouponsFromDB();
  var goodCoupons = selectCouponsByRank(coupons, "good");
  var bestCoupons = selectCouponsByRank(coupons, "best");
  var subscribers = fetchSubscribersFromDB();
  var emails = emailsForSubscribers(subscribers, goodCoupons, bestCoupons);

  for (let e = 0; e < emails.length; e++) {
    var email = emails[e];
    emailSystem.send(email);
  }
}
