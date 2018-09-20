import { composeAPI } from '@iota/core';
import { generateAddress } from '@iota/core'
import { createPrepareTransfers } from '@iota/core'
import { isTrytes } from '@iota/validators'
import { isValidChecksum } from '@iota/checksum'

function broadcastBundle(): void {

  // Read user input fields
  var nodeURL: string = (<HTMLInputElement>document.getElementById('nodeURL')).value;
  var nodePort: string = (<HTMLInputElement>document.getElementById('nodePort')).value;
  var bundleTrytes: string = JSON.parse((<HTMLInputElement>document.getElementById('signedBundleTrytes')).value);

  // Find references for feedback and output elements
  var feedbackElement: HTMLInputElement = <HTMLInputElement>document.getElementById('sendResult');

  // Depth or how far to go for tip selection entry point
  const tipSelectionDepth = 3;

  // Set the Proof-of-Work difficulty. (mainnet & spamnet = 14, devnet = 9)
  const minWeightMagnitude = 14;

  // Connect to an iota node
  const iota: any = composeAPI({
    provider: nodeURL + ":" + nodePort
  });

  // Send the signed bundle to the node
  iota.sendTrytes(bundleTrytes, tipSelectionDepth, minWeightMagnitude)
    .then((bundle: any) => {
      feedbackElement.innerHTML = "Success! Bundled has been broadcasted!";
      var anchorElement = document.createElement('a');
      var textNode = document.createTextNode("Inspect transaction bundle @ TheTangle.org");
      anchorElement.appendChild(textNode);
      anchorElement.title = "Inspect transaction bundle @ TheTangle.org";
      anchorElement.href = "https://thetangle.org/bundle/" + bundle[0].bundle;
      document.body.appendChild(anchorElement);
    })
    .catch((err: any) => {
      feedbackElement.innerHTML = "An error occurred upon broadcasting the bundle! Read the console for additional details.";
      console.log(`Error: ${err}`)
    });
}

// Expose the function to the browser
(<any>window).broadcastBundle = broadcastBundle;
