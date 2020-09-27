import * as React from "react";
import { FunctionComponent } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});
interface offerTypeHandler {
  index: number;
  operatedBy: string;
  rateID: string;
  totalForThisRate: any;
  setHighlight: any;
  offer: offerTypeFromAbove;
}

interface offerTypeFromAbove {
  operatedBy: string;
  rateID: string;
  totalForThisRate: any;
}

//this compeonent recives single offer and present it
//setHighlight will cause this specific offer to Dialog
export const OffersHandler: FunctionComponent<offerTypeHandler> = ({
  operatedBy,
  rateID,
  totalForThisRate,
  setHighlight,
  index,
  offer,
}: offerTypeHandler) => {
  const [valueTotalUSD, setValueTotalUSD] = React.useState(0);
  // function handelClickView() {
  //   setHighlight(index);
  // }
  const classes = useStyles();
  console.log("offer ", index, offer);
  // let totalHelperLocal = offer.totalForThisRate.local.usd
  // let totalHelperExw = offer.totalForThisRate.local.usd

  React.useEffect(() => {
    let totalHelperFob = offer.totalForThisRate.fob.usd;

    setValueTotalUSD(totalHelperFob);
  }, []);

  function HanldeClinkViewOffer(index: number) {
    setHighlight(index);
  }
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="/static/images/cards/contemplative-reptile.jpg"
          title="Contemplative Reptile"
        />

        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {offer.operatedBy}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Info about FF
          </Typography>
        </CardContent>
      </CardActionArea>

      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={() => HanldeClinkViewOffer(index)}
        >
          View
        </Button>
        {/* <Button size="small" color="primary">
          Learn More
        </Button> */}
      </CardActions>
    </Card>
  );
};
