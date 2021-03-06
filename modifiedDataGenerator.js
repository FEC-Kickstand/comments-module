const faker = require('faker');
const fs = require('fs');

function getRandomInt(min, max) {
  const minVal = Math.ceil(min);
  const maxVal = Math.floor(max);
  return Math.floor(Math.random() * (maxVal - minVal)) + minVal;
}

function isCreator(percentLikely) {
  if (getRandomInt(1, 101) < percentLikely) {
    return true;
  }
  return false;
}

function getRandomProfilePic() {
  const defaultProfilePic = 'https://i.postimg.cc/3JMZ83vC/Screen-Shot-2018-11-01-at-10-56-59-AM.png';
  const otherPics = [
    'https://i.postimg.cc/dV6RjdS4/Screen-Shot-2018-11-01-at-10-57-32-AM.png',
    'https://i.postimg.cc/8CnhqGGv/Screen-Shot-2018-11-01-at-10-57-47-AM.png',
    'https://i.postimg.cc/W3B017hb/Screen-Shot-2018-11-01-at-10-57-57-AM.png',
    'https://i.postimg.cc/PxpmH7fR/Screen-Shot-2018-11-01-at-10-58-18-AM.png',
    'https://i.postimg.cc/Z5WYwzw2/Screen-Shot-2018-11-01-at-11-02-00-AM.png',
    'https://i.postimg.cc/JzSrgYgn/Screen-Shot-2018-11-01-at-11-02-52-AM.png',
    'https://i.postimg.cc/rmk8y0q2/Screen-Shot-2018-11-01-at-11-03-06-AM.png',
    'https://i.postimg.cc/DzsvKdkc/Screen-Shot-2018-11-01-at-11-03-14-AM.png',
    'https://i.postimg.cc/RFLvWS06/Screen-Shot-2018-11-01-at-11-03-53-AM.png',
    'https://i.postimg.cc/kGj9yTK7/Screen-Shot-2018-11-01-at-11-03-59-AM.png',
    'https://i.postimg.cc/mZVbRgqK/Screen-Shot-2018-11-01-at-11-04-09-AM.png',
    'https://i.postimg.cc/NFGBT3yN/Screen-Shot-2018-11-01-at-11-04-20-AM.png',
  ];
  const intRange = otherPics.length * 2;
  const randomInt = getRandomInt(0, intRange);
  if (randomInt >= otherPics.length) {
    return defaultProfilePic;
  }
  return otherPics[randomInt];
}

function randomBodyLength() {
  if (getRandomInt(1, 11) > 6) {
    return faker.lorem.paragraph();
  }
  return faker.lorem.paragraphs();
}

function generateReplies() {
  const replies = [];
  for (let i = 0; i < getRandomInt(0, 4); i += 1) {
    replies.push({
      author: faker.name.findName(),
      authorIsCreator: isCreator(50),
      profilePicture: getRandomProfilePic(),
      createdAt: faker.date.recent(),
      body: randomBodyLength(),
    });
  }

  return replies;
}

let projects = [];
for (let i = 1; i <= 100; i += 1) {
  const fakeCommentData = [];
  for (let j = 0; j < getRandomInt(1, 26); j += 1) {
    fakeCommentData.push({
      author: faker.name.findName(),
      authorIsCreator: isCreator(1),
      profilePicture: getRandomProfilePic(),
      createdAt: faker.date.recent(),
      body: randomBodyLength(),
      replies: generateReplies(),
    });
  }
  projects.push({
    projectId: i,
    comments: fakeCommentData,
  });
}

console.log('projects array: ', JSON.stringify(projects));

fs.writeFile('commentData.json', JSON.stringify(projects), function (err) {
    if (err) 
        return console.log(err);
    console.log('file write success');
});
