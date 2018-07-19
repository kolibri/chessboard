# Chessboard

A simple PGN viewer in JavaScript and CSS. Minimalistic, but configurable.

*NOTICE: I'm not a JS/CSS developer. I hacked this together only for my purporse. So, pull request, suggestions and other kinds of feedback are VERY, VERY welcome!!! Just [create an issue](https://github.com/kolibri/chessboard/issues/new) on github or contact me on twitter [@ko_libri](https://twitter.com/ko_libri)*

## Demo

Check [kolibri.github.io/chessboard/](https://kolibri.github.io/chessboard/) or have a look at [my site](http://vogelschwarz.de/en/chess)

## How to use

Include `chessboard.js` and `chess.js`(from [chess.js](https://github.com/jhlywa/chess.js)) in your HMTL.

Add  `div`s with class `pgn`, that contains a PGN string.

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

## Customizations / Get into it:

### Data Attributes

There is some configuration available with `data`-attributes at the div:

#### Example with default values

```html
<div
    class="pgn"
    data-label-next="next"
    data-label-back="back"
    data-label-reset="reset"
    data-label-turn="turn"
    data-reversed="false"
    data-ply=""
    data-display-headers="White,Black,Date,Event,Result"
    data-show-moves="true"
    data-show-buttons="true"
    data-show-header="true"
    data-piece-names='{"k": "K", "q": "Q", "b": "B", "n": "N", "r": "R", "p": ""}'
>[pgn]</div>
```

#### Description

- `data-label-next`: text for the "next" button
- `data-label-back`: text for the "back" button
- `data-label-reset`: text for the "reset" button
- `data-label-turn`: text for the "turn board" button
- `data-reversed`: Set this to `"true"` to flip the board
- `data-ply`: halfmove to display at first rendering
- `data-display-headers`: List of headers, that should be show. Notice, that they start with a capital letter, and you only can print out headers, that are present in the pgn string.
- `data-show-moves`: Set this to `"false"` to hide moves.
- `data-show-buttons`: Set this to `"false"` to hide buttons
- `data-show-header`: Set this to `"false"` to hide headers
- `data-piece-names`: Set piece names for notation. Usefull for translations **IMPORTANT**: Use Double Quotes *inside* the JSON string, and single quotes *outside*

### Styling

The board builds from two parts:

1. The JavaScript, that transforms the PGN string into HTML objects, representing a chessboard, clickable moves, header and the buttons.

2. The [less](http://lesscss.org/)/CSS, that does the whole styling. This includes: The chess pieces (rendered with `:after`-selector with `content` attribute), coordinates on the board, etc.

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

The default pieces are the unicode symbols of the current font type.
You can replace them with your own images by setting them as background for the fields:

```css
/* adjust background colors of fields */
.field.white { background-color: #FF0; }
.field.black { background-color: #00F; }

/* disable unicode pieces, sorry for !important */
.field:after {content: '' !important;}
/* general field config */
.field {
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
}
/* set background images for each piece */
/* Note, that fields has class ".field" AND the piece-class */
/* white king */
.field.wk { background-image: url('img/wk.png'); }
/* white queen */
.field.wq { background-image: url('img/wq.png'); }
/* white rook */
.field.wr { background-image: url('img/wr.png'); }
/* white bishop */
.field.wb { background-image: url('img/wb.png'); }
/* white kNight */
.field.wn { background-image: url('img/wn.png'); }
/* white pawn */
.field.wp { background-image: url('img/wp.png'); }
/* black king */
.field.bk { background-image: url('img/bk.png'); }
/* black queen */
.field.bq { background-image: url('img/bq.png'); }
/* black rook */
.field.br { background-image: url('img/br.png'); }
/* black bishop */
.field.bb { background-image: url('img/bb.png'); }
/* black kNight */
.field.bn { background-image: url('img/bn.png'); }
/* black pawn */
.field.bp { background-image: url('img/bp.png'); }
```



