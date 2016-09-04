# Chessboard

A (very) simple PGN viewer in JavaScript

*ATTENTION: I'm not a JS developer. I hacked this together only for my purporse. So, pull request, suggestions and other kinds of feedback are VERY, VERY welcome!!!*

## Demo

Check [kolibri.github.io/chessboard/](https://kolibri.github.io/chessboard/) or have a look at [my site](http://vogelschwarz.de/en/chess)

## How to use

Include `chessboard.js` and `chess.js`(from [chess.js](https://github.com/jhlywa/chess.js)) in your HMTL.

Add  `div`s with class `pgn`, that contains a PGN string.

There is some configuration available with `data`-attributes at the div:

Example with default values:
```html
<div
    class="pgn"
    data-label-next="next"
    data-label-back="back"
    data-label-reset="reset"
    data-ply=""
    data-headers="White,Black,Date,Event,Result"
    data-show-moves="true"
    data-show-buttons="true"
    data-show-header="true"
>[pgn]</div>
```

`data-label-next`: text for the "next" button

`data-label-back`: text for the "back" button

`data-label-reset`: tex for the "reset" button

`data-ply`: halfmove to display at first rendering

`data-headers`: List of headers, that should be show. Notice, that they start with a capital letter, and you only can print out headers, that are given in the pgn string.

`data-show-moves`: Set this to `"false"` to hide moves.

`data-show-buttons`: Set this to `"false"` to hide buttons

`data-show-header`: Set this to `"false"` to hide headers

## Example

```html
<!DOCTYPE html>
<html lang="de">
<head>
    <link rel="stylesheet" href="chessboard.css">
    <title>chessboard</title>
</head>
<body>

<div class="pgn">
    [Event "Simultaneous"]
    [Site "Budapest HUN"]
    [Date "1934.??.??"]
    [EventDate "?"]
    [Round "?"]
    [Result "1-0"]
    [White "Esteban Canal"]
    [Black "NN"]
    [ECO "B01"]
    [WhiteElo "?"]
    [BlackElo "?"]
    [PlyCount "27"]

    1.e4 d5 2.exd5 Qxd5 3.Nc3 Qa5 4.d4 c6 5.Nf3 Bg4 6.Bf4 e6 7.h3 
    Bxf3 8.Qxf3 Bb4 9.Be2 Nd7 10.a3 O-O-O 11.axb4 Qxa1+ 12.Kd2 
    Qxh1 13.Qxc6+ bxc6 14.Ba6# 1-0
</div>
    <script src="chess.min.js" type="text/javascript"></script>
    <script src="chessboard.js" type="text/javascript"></script>
</body>
</html>
```

## Get into it:

The board build from two parts:

1. The JavaScript, that transforms the PGN string into HTML objects, representing a chessboard, clickable moves, header and the buttons.

2. The [less](http://lesscss.org/)/CSS, that does the whole styling. This includes: The chess pieces (rendered as `:after`-Attributes with `content` and the unicode for the piece), coordinates on the board, etc.

This means, if you want to customize the view of the board, you have to deal with less/CSS. Here a quick introduction:

### Change size of the board:

To Change the size of the board, you have to set at least these variables:

```css
.board {
    /* be sure, you set the same value for width and height */
    /* (Only if you want a square board.) */
    width: 16em; 
    height: 16em; 
}
.field:after {
    /* set 1/8 of the width as font size */
    /* (You only need this, if you use the default unicode pieces ) */
    font-size: 2em; 
}
```

### Change pieces

The default pieces are hte unicode symboly of the current font type.
You can replace them with you own images by setting them as background for the fields:

```css
/* adjust background colors of fields */
.custom-board .field.white { background-color: #FF0; }
.custom-board .field.black { background-color: #00F; }

/* disable unicode pieces, sorry for !important */
.custom-board .field:after {content: '' !important;}
/* general field config */
.custom-board .field {
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
}
/* set background images for each piece */
/* Note, that fields has class ".field" AND the piece-class */
/* white king */
.custom-board .field.wk { background-image: url('img/wk.png'); }
/* white queen */
.custom-board .field.wq { background-image: url('img/wq.png'); }
/* white rook */
.custom-board .field.wr { background-image: url('img/wr.png'); }
/* white bishop */
.custom-board .field.wb { background-image: url('img/wb.png'); }
/* white kNight */
.custom-board .field.wn { background-image: url('img/wn.png'); }
/* white pawn */
.custom-board .field.wp { background-image: url('img/wp.png'); }
/* black king */
.custom-board .field.bk { background-image: url('img/bk.png'); }
/* black queen */
.custom-board .field.bq { background-image: url('img/bq.png'); }
/* black rook */
.custom-board .field.br { background-image: url('img/br.png'); }
/* black bishop */
.custom-board .field.bb { background-image: url('img/bb.png'); }
/* black kNight */
.custom-board .field.bn { background-image: url('img/bn.png'); }
/* black pawn */
.custom-board .field.bp { background-image: url('img/bp.png'); }
```



